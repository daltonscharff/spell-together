set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.refresh_word_with_puzzle_id()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  BEGIN
  REFRESH MATERIALIZED VIEW word_with_puzzle_id;
  RETURN NULL;
  END $function$
;

CREATE TRIGGER refresh_word_with_puzzle_id_trigger AFTER INSERT OR DELETE OR UPDATE OR TRUNCATE ON public.puzzle_to_word FOR EACH STATEMENT EXECUTE FUNCTION refresh_word_with_puzzle_id();


