set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.guess_table_changes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  perform realtime.broadcast_changes(
    new.room_id::text || '_' || new.puzzle_id::text,
      'guess-table-insert',
      'INSERT',
      'guess',
      'public',
      new,
      old
    );
  return null;
end;
$function$
;


