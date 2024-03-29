-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

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
    word.part_of_speech
   FROM guess
     JOIN room ON guess.room_id = room.id
     JOIN word ON guess.word_id = word.id
  WHERE guess.is_correct = true;

ALTER TABLE public.correct_guess
    OWNER TO postgres;

GRANT ALL ON TABLE public.correct_guess TO authenticated;
GRANT ALL ON TABLE public.correct_guess TO postgres;
GRANT ALL ON TABLE public.correct_guess TO anon;
GRANT ALL ON TABLE public.correct_guess TO service_role;
