-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.create_room(
	_name character varying DEFAULT NULL::character varying)
    RETURNS SETOF room 
    LANGUAGE 'sql'
    ROWS 1

AS $BODY$

INSERT INTO room (shortcode, puzzle_id, name) VALUES (generate_shortcode(6), (SELECT id FROM puzzle ORDER BY date DESC LIMIT 1), _name) RETURNING *;
$BODY$;

ALTER FUNCTION public.create_room(character varying)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_room(character varying) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.create_room(character varying) TO anon;

GRANT EXECUTE ON FUNCTION public.create_room(character varying) TO authenticated;

GRANT EXECUTE ON FUNCTION public.create_room(character varying) TO postgres;

GRANT EXECUTE ON FUNCTION public.create_room(character varying) TO service_role;