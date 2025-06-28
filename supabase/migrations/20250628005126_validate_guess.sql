CREATE UNIQUE INDEX guess_room_id_puzzle_id_word_id_key ON public.guess USING btree (room_id, puzzle_id, word_id);

alter table "public"."guess" add constraint "guess_room_id_puzzle_id_word_id_key" UNIQUE using index "guess_room_id_puzzle_id_word_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.validate_guess()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
puzzle_to_word_id UUID;
begin
  select id into puzzle_to_word_id from puzzle_to_word where new.puzzle_id = puzzle_to_word.puzzle_id and new.word_id = puzzle_to_word.word_id;

  if puzzle_to_word_id is null then
    raise exception 'Word not in puzzle';
  end if;
  
  return new;
end;
$function$
;

CREATE TRIGGER before_insert_guess BEFORE INSERT ON public.guess FOR EACH ROW EXECUTE FUNCTION validate_guess();


