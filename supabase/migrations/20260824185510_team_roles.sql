-- Etape 6 : organisations, membres et roles, avec RLS reelle.
-- Un seul owner par organisation. Un admin peut inviter/modifier/revoquer,
-- sauf toucher au owner. Un membre ne peut rien modifier, ni via l'UI ni
-- via une requete directe a la base (verifie par ces politiques).

create type membership_role as enum ('owner', 'admin', 'membre');
create type membership_status as enum ('pending', 'active', 'revoked');

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  role membership_role not null default 'membre',
  status membership_status not null default 'pending',
  invited_by uuid references auth.users (id),
  invited_at timestamptz not null default now(),
  expires_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  unique (org_id, email)
);

-- Un seul owner actif par organisation.
create unique index one_owner_per_org on memberships (org_id)
  where role = 'owner' and status <> 'revoked';

create index memberships_user_id_idx on memberships (user_id);
create index memberships_org_id_idx on memberships (org_id);

alter table organizations enable row level security;
alter table memberships enable row level security;

-- Fonction utilitaire (security definer) pour eviter la recursion RLS :
-- une politique sur memberships qui interrogerait memberships directement
-- reappliquerait ses propres politiques a la sous-requete.
create or replace function public.has_org_role(target_org uuid, allowed_roles membership_role[])
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from memberships m
    where m.org_id = target_org
      and m.user_id = auth.uid()
      and m.status = 'active'
      and m.role = any(allowed_roles)
  );
$$;

create policy "org members can read their organization"
on organizations for select
to authenticated
using (
  exists (
    select 1 from memberships m
    where m.org_id = organizations.id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

create policy "org members can read their roster"
on memberships for select
to authenticated
using (has_org_role(org_id, array['owner', 'admin', 'membre']::membership_role[]));

create policy "owner or admin can invite"
on memberships for insert
to authenticated
with check (
  has_org_role(org_id, array['owner', 'admin']::membership_role[])
  and (role <> 'owner' or has_org_role(org_id, array['owner']::membership_role[]))
);

create policy "owner or admin can update roster, never the owner row unless owner"
on memberships for update
to authenticated
using (
  has_org_role(org_id, array['owner', 'admin']::membership_role[])
  and (role <> 'owner' or has_org_role(org_id, array['owner']::membership_role[]))
)
with check (
  has_org_role(org_id, array['owner', 'admin']::membership_role[])
  and (role <> 'owner' or has_org_role(org_id, array['owner']::membership_role[]))
);

-- A l'inscription : si un courriel a une invitation en attente, on la lie ;
-- sinon on cree une nouvelle organisation dont l'inscrit devient owner.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  pending_id uuid;
  new_org_id uuid;
begin
  select id into pending_id
  from memberships
  where email = new.email and status = 'pending' and user_id is null
  limit 1;

  if pending_id is not null then
    update memberships set user_id = new.id where id = pending_id;
  else
    insert into organizations (name)
    values (split_part(new.email, '@', 1) || ' — Registre')
    returning id into new_org_id;

    insert into memberships (org_id, user_id, email, role, status, responded_at)
    values (new_org_id, new.id, new.email, 'owner', 'active', now());
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- A la premiere connexion reelle : une invitation en attente devient active.
create or replace function public.handle_user_sign_in()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.last_sign_in_at is not null and old.last_sign_in_at is null then
    update memberships
    set status = 'active', responded_at = now()
    where user_id = new.id and status = 'pending';
  end if;
  return new;
end;
$$;

create trigger on_auth_user_sign_in
after update on auth.users
for each row execute function public.handle_user_sign_in();
