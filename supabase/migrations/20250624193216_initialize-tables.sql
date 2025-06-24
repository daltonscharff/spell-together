create table "public"."guess" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "submitted_by" text not null,
    "is_correct" boolean not null default true,
    "room_id" uuid not null,
    "puzzle_id" uuid not null,
    "word_id" uuid not null
);


alter table "public"."guess" enable row level security;

create table "public"."puzzle" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "date" date not null default now(),
    "outer_letters" text[] not null,
    "center_letter" text not null,
    "max_score" smallint not null
);


alter table "public"."puzzle" enable row level security;

create table "public"."puzzle_to_word" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "puzzle_id" uuid not null,
    "word_id" uuid not null
);


alter table "public"."puzzle_to_word" enable row level security;

create table "public"."room" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "shortcode" text not null
);


alter table "public"."room" enable row level security;

create table "public"."word" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "word" text not null,
    "point_value" smallint not null,
    "is_pangram" boolean not null,
    "definition" text,
    "part_of_speech" text
);


alter table "public"."word" enable row level security;

CREATE UNIQUE INDEX guess_pkey ON public.guess USING btree (id);

CREATE INDEX guess_puzzle_id_idx ON public.guess USING hash (puzzle_id);

CREATE INDEX guess_room_id_idx ON public.guess USING hash (room_id);

CREATE UNIQUE INDEX puzzle_date_key ON public.puzzle USING btree (date);

CREATE UNIQUE INDEX puzzle_pkey ON public.puzzle USING btree (id);

CREATE UNIQUE INDEX puzzle_to_word_pkey ON public.puzzle_to_word USING btree (id);

CREATE INDEX puzzle_to_word_puzzle_id_idx ON public.puzzle_to_word USING hash (puzzle_id);

CREATE UNIQUE INDEX room_pkey ON public.room USING btree (id);

CREATE UNIQUE INDEX room_shortcode_key ON public.room USING btree (shortcode);

CREATE UNIQUE INDEX word_pkey ON public.word USING btree (id);

CREATE UNIQUE INDEX word_word_key ON public.word USING btree (word);

alter table "public"."guess" add constraint "guess_pkey" PRIMARY KEY using index "guess_pkey";

alter table "public"."puzzle" add constraint "puzzle_pkey" PRIMARY KEY using index "puzzle_pkey";

alter table "public"."puzzle_to_word" add constraint "puzzle_to_word_pkey" PRIMARY KEY using index "puzzle_to_word_pkey";

alter table "public"."room" add constraint "room_pkey" PRIMARY KEY using index "room_pkey";

alter table "public"."word" add constraint "word_pkey" PRIMARY KEY using index "word_pkey";

alter table "public"."guess" add constraint "guess_puzzle_id_fkey" FOREIGN KEY (puzzle_id) REFERENCES puzzle(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."guess" validate constraint "guess_puzzle_id_fkey";

alter table "public"."guess" add constraint "guess_room_id_fkey" FOREIGN KEY (room_id) REFERENCES room(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."guess" validate constraint "guess_room_id_fkey";

alter table "public"."guess" add constraint "guess_word_id_fkey" FOREIGN KEY (word_id) REFERENCES word(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."guess" validate constraint "guess_word_id_fkey";

alter table "public"."puzzle" add constraint "puzzle_date_key" UNIQUE using index "puzzle_date_key";

alter table "public"."puzzle_to_word" add constraint "puzzle_to_word_puzzle_id_fkey" FOREIGN KEY (puzzle_id) REFERENCES puzzle(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."puzzle_to_word" validate constraint "puzzle_to_word_puzzle_id_fkey";

alter table "public"."puzzle_to_word" add constraint "puzzle_to_word_word_id_fkey" FOREIGN KEY (word_id) REFERENCES word(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."puzzle_to_word" validate constraint "puzzle_to_word_word_id_fkey";

alter table "public"."room" add constraint "room_shortcode_key" UNIQUE using index "room_shortcode_key";

alter table "public"."word" add constraint "word_word_key" UNIQUE using index "word_word_key";

grant delete on table "public"."guess" to "anon";

grant insert on table "public"."guess" to "anon";

grant references on table "public"."guess" to "anon";

grant select on table "public"."guess" to "anon";

grant trigger on table "public"."guess" to "anon";

grant truncate on table "public"."guess" to "anon";

grant update on table "public"."guess" to "anon";

grant delete on table "public"."guess" to "authenticated";

grant insert on table "public"."guess" to "authenticated";

grant references on table "public"."guess" to "authenticated";

grant select on table "public"."guess" to "authenticated";

grant trigger on table "public"."guess" to "authenticated";

grant truncate on table "public"."guess" to "authenticated";

grant update on table "public"."guess" to "authenticated";

grant delete on table "public"."guess" to "service_role";

grant insert on table "public"."guess" to "service_role";

grant references on table "public"."guess" to "service_role";

grant select on table "public"."guess" to "service_role";

grant trigger on table "public"."guess" to "service_role";

grant truncate on table "public"."guess" to "service_role";

grant update on table "public"."guess" to "service_role";

grant delete on table "public"."puzzle" to "anon";

grant insert on table "public"."puzzle" to "anon";

grant references on table "public"."puzzle" to "anon";

grant select on table "public"."puzzle" to "anon";

grant trigger on table "public"."puzzle" to "anon";

grant truncate on table "public"."puzzle" to "anon";

grant update on table "public"."puzzle" to "anon";

grant delete on table "public"."puzzle" to "authenticated";

grant insert on table "public"."puzzle" to "authenticated";

grant references on table "public"."puzzle" to "authenticated";

grant select on table "public"."puzzle" to "authenticated";

grant trigger on table "public"."puzzle" to "authenticated";

grant truncate on table "public"."puzzle" to "authenticated";

grant update on table "public"."puzzle" to "authenticated";

grant delete on table "public"."puzzle" to "service_role";

grant insert on table "public"."puzzle" to "service_role";

grant references on table "public"."puzzle" to "service_role";

grant select on table "public"."puzzle" to "service_role";

grant trigger on table "public"."puzzle" to "service_role";

grant truncate on table "public"."puzzle" to "service_role";

grant update on table "public"."puzzle" to "service_role";

grant delete on table "public"."puzzle_to_word" to "anon";

grant insert on table "public"."puzzle_to_word" to "anon";

grant references on table "public"."puzzle_to_word" to "anon";

grant select on table "public"."puzzle_to_word" to "anon";

grant trigger on table "public"."puzzle_to_word" to "anon";

grant truncate on table "public"."puzzle_to_word" to "anon";

grant update on table "public"."puzzle_to_word" to "anon";

grant delete on table "public"."puzzle_to_word" to "authenticated";

grant insert on table "public"."puzzle_to_word" to "authenticated";

grant references on table "public"."puzzle_to_word" to "authenticated";

grant select on table "public"."puzzle_to_word" to "authenticated";

grant trigger on table "public"."puzzle_to_word" to "authenticated";

grant truncate on table "public"."puzzle_to_word" to "authenticated";

grant update on table "public"."puzzle_to_word" to "authenticated";

grant delete on table "public"."puzzle_to_word" to "service_role";

grant insert on table "public"."puzzle_to_word" to "service_role";

grant references on table "public"."puzzle_to_word" to "service_role";

grant select on table "public"."puzzle_to_word" to "service_role";

grant trigger on table "public"."puzzle_to_word" to "service_role";

grant truncate on table "public"."puzzle_to_word" to "service_role";

grant update on table "public"."puzzle_to_word" to "service_role";

grant delete on table "public"."room" to "anon";

grant insert on table "public"."room" to "anon";

grant references on table "public"."room" to "anon";

grant select on table "public"."room" to "anon";

grant trigger on table "public"."room" to "anon";

grant truncate on table "public"."room" to "anon";

grant update on table "public"."room" to "anon";

grant delete on table "public"."room" to "authenticated";

grant insert on table "public"."room" to "authenticated";

grant references on table "public"."room" to "authenticated";

grant select on table "public"."room" to "authenticated";

grant trigger on table "public"."room" to "authenticated";

grant truncate on table "public"."room" to "authenticated";

grant update on table "public"."room" to "authenticated";

grant delete on table "public"."room" to "service_role";

grant insert on table "public"."room" to "service_role";

grant references on table "public"."room" to "service_role";

grant select on table "public"."room" to "service_role";

grant trigger on table "public"."room" to "service_role";

grant truncate on table "public"."room" to "service_role";

grant update on table "public"."room" to "service_role";

grant delete on table "public"."word" to "anon";

grant insert on table "public"."word" to "anon";

grant references on table "public"."word" to "anon";

grant select on table "public"."word" to "anon";

grant trigger on table "public"."word" to "anon";

grant truncate on table "public"."word" to "anon";

grant update on table "public"."word" to "anon";

grant delete on table "public"."word" to "authenticated";

grant insert on table "public"."word" to "authenticated";

grant references on table "public"."word" to "authenticated";

grant select on table "public"."word" to "authenticated";

grant trigger on table "public"."word" to "authenticated";

grant truncate on table "public"."word" to "authenticated";

grant update on table "public"."word" to "authenticated";

grant delete on table "public"."word" to "service_role";

grant insert on table "public"."word" to "service_role";

grant references on table "public"."word" to "service_role";

grant select on table "public"."word" to "service_role";

grant trigger on table "public"."word" to "service_role";

grant truncate on table "public"."word" to "service_role";

grant update on table "public"."word" to "service_role";

create policy "Enable delete for supabase_admin"
on "public"."guess"
as permissive
for delete
to supabase_admin
using (true);


create policy "Enable insert for authenticated users only"
on "public"."guess"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."guess"
as permissive
for select
to public
using (true);


create policy "Enable delete for supabase_admin"
on "public"."puzzle"
as permissive
for delete
to supabase_admin
using (true);


create policy "Enable insert for supabase_admin"
on "public"."puzzle"
as permissive
for insert
to supabase_admin
with check (true);


create policy "Enable read access for all users"
on "public"."puzzle"
as permissive
for select
to public
using (true);


create policy "Enable delete for supabase_admin"
on "public"."puzzle_to_word"
as permissive
for delete
to supabase_admin
using (true);


create policy "Enable insert for supabase_admin"
on "public"."puzzle_to_word"
as permissive
for insert
to supabase_admin
with check (true);


create policy "Enable read access for all users"
on "public"."puzzle_to_word"
as permissive
for select
to public
using (true);


create policy "Enable delete for supabase_admin"
on "public"."room"
as permissive
for delete
to supabase_admin
using (true);


create policy "Enable insert for authenticated users only"
on "public"."room"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."room"
as permissive
for select
to public
using (true);


create policy "Enable delete for supabase_admin"
on "public"."word"
as permissive
for delete
to supabase_admin
using (true);


create policy "Enable insert for supabase_admin"
on "public"."word"
as permissive
for insert
to supabase_admin
with check (true);


create policy "Enable read access for all users"
on "public"."word"
as permissive
for select
to public
using (true);


create policy "Enable update for supabase_admin"
on "public"."word"
as permissive
for update
to supabase_admin
using (true);



