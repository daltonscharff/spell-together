-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.room
    ADD COLUMN puzzle_id uuid NOT NULL;
ALTER TABLE IF EXISTS public.room
    ADD CONSTRAINT room_puzzle_id_fkey FOREIGN KEY (puzzle_id)
    REFERENCES public.puzzle (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;