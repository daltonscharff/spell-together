-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.puzzle
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    date date NOT NULL DEFAULT now(),
    outer_letters character(1)[] COLLATE pg_catalog."default" NOT NULL,
    center_letter character(1) COLLATE pg_catalog."default" NOT NULL,
    max_score smallint NOT NULL,
    CONSTRAINT puzzle_pkey PRIMARY KEY (id),
    CONSTRAINT puzzle_date_key UNIQUE (date)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.puzzle
    OWNER to postgres;

ALTER TABLE IF EXISTS public.puzzle
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.puzzle TO anon;

GRANT ALL ON TABLE public.puzzle TO authenticated;

GRANT ALL ON TABLE public.puzzle TO postgres;

GRANT ALL ON TABLE public.puzzle TO service_role;