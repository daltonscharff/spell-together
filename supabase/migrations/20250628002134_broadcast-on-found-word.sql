set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.guess_table_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin
  perform realtime.broadcast_changes(
    NEW.room_id::text || '_' || NEW.puzzle_id::text,
      TG_OP,
      TG_OP,
      TG_TABLE_NAME,
      TG_TABLE_SCHEMA,
      NEW,
      OLD
    );
  return null;
end;
$function$
;


