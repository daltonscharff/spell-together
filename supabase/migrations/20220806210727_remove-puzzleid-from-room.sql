-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

DROP VIEW public.correct_guess CASCADE;
CREATE OR REPLACE VIEW public.correct_guess
    AS
     SELECT guess.id AS guess_id,
    guess.created_at,
    guess.is_correct,
    guess.username,
    room.id AS room_id,
    room.shortcode,
    word.id AS word_id,
    word.word,
    word.point_value,
    word.is_pangram,
    word.definition,
    word.part_of_speech
   FROM guess
     JOIN room ON guess.room_id = room.id
     JOIN word ON guess.word_id = word.id
  WHERE guess.is_correct = true;
GRANT ALL ON TABLE public.correct_guess TO authenticated;
GRANT ALL ON TABLE public.correct_guess TO postgres;
GRANT ALL ON TABLE public.correct_guess TO anon;
GRANT ALL ON TABLE public.correct_guess TO service_role;

CREATE OR REPLACE FUNCTION public.submit_guess(
	_word character varying,
	_username character varying,
	_room_id uuid,
	_puzzle_id uuid)
    RETURNS SETOF correct_guess 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1

AS $BODY$
declare
  word_id uuid := (select id from word where word = _word);
  _guess_id uuid;
begin

IF word_id IS null THEN return; END IF;

INSERT INTO guess (is_correct, username, room_id, word_id, puzzle_id) VALUES (TRUE, _username, _room_id, word_id, _puzzle_id) RETURNING id INTO _guess_id;

RETURN query SELECT * FROM correct_guess WHERE guess_id=_guess_id;

end;
$BODY$;

ALTER FUNCTION public.submit_guess(character varying, character varying, uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO anon;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO authenticated;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO postgres;

GRANT EXECUTE ON FUNCTION public.submit_guess(character varying, character varying, uuid, uuid) TO service_role;

DROP FUNCTION IF EXISTS public.submit_guess(_word character varying, _username character varying, _shortcode character varying);

DROP FUNCTION IF EXISTS public.submit_guess(_word character varying, _username character varying, _room_id uuid);

ALTER TABLE IF EXISTS public.puzzle DROP COLUMN IF EXISTS editor;

ALTER TABLE IF EXISTS public.room DROP COLUMN IF EXISTS puzzle_id;
ALTER TABLE IF EXISTS public.room DROP CONSTRAINT IF EXISTS room_puzzle_id_fkey;
