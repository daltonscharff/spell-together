-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.submit_guess(
	_word character varying,
	_username character varying,
	_room_id uuid,
	_puzzle_id uuid)
    RETURNS SETOF correct_guess 
    LANGUAGE 'plpgsql'
    VOLATILE SECURITY DEFINER
    PARALLEL UNSAFE
    COST 100    ROWS 1
    SET search_path=public
AS $BODY$
DECLARE
  word_id uuid := (SELECT id FROM word WHERE word = _word);
  _guess_id uuid;
BEGIN

INSERT INTO guess (is_correct, username, room_id, puzzle_id, word_id) VALUES (TRUE, _username, _room_id, _puzzle_id, word_id) RETURNING id INTO _guess_id;

RETURN query SELECT * FROM correct_guess WHERE guess_id=_guess_id;

EXCEPTION 
  WHEN sqlstate '22P02' OR sqlstate '23503' OR sqlstate '23502' THEN 
    RETURN;

END;
$BODY$;

ALTER FUNCTION public.submit_guess(character varying, character varying, uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO anon;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO authenticated;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO postgres;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO service_role;

REVOKE ALL ON TABLE public.guess FROM authenticated;
REVOKE ALL ON TABLE public.guess FROM postgres;
REVOKE ALL ON TABLE public.guess FROM service_role;
GRANT ALL ON TABLE public.guess TO authenticated;

GRANT ALL ON TABLE public.guess TO service_role;

GRANT ALL ON TABLE public.guess TO postgres;

ALTER TABLE IF EXISTS public.guess
    ADD COLUMN puzzle_id uuid NOT NULL;

ALTER TABLE IF EXISTS public.guess
    ADD CONSTRAINT guess_puzzle_id_fkey FOREIGN KEY (puzzle_id)
    REFERENCES public.puzzle (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

REVOKE ALL ON TABLE public.room FROM authenticated;
REVOKE ALL ON TABLE public.room FROM postgres;
REVOKE ALL ON TABLE public.room FROM service_role;
GRANT ALL ON TABLE public.room TO authenticated;

GRANT ALL ON TABLE public.room TO service_role;

GRANT ALL ON TABLE public.room TO postgres;

CREATE OR REPLACE VIEW public.correct_guess
    AS
    SELECT guess.id AS guess_id,
    guess.created_at,
    guess.is_correct,
    guess.username,
    room.id AS room_id,
    room.shortcode,
    room.name,
    word.id AS word_id,
    word.word,
    word.point_value,
    word.is_pangram,
    word.definition,
    word.part_of_speech,
    puzzle.id AS puzzle_id,
    puzzle.date,
    puzzle.outer_letters,
    puzzle.center_letter,
    puzzle.max_score
   FROM guess
     JOIN room ON guess.room_id = room.id
     JOIN word ON guess.word_id = word.id
     JOIN puzzle ON guess.puzzle_id = puzzle.id
  WHERE guess.is_correct = true;
