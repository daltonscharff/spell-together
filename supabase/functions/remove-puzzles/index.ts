import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import removePuzzles from "../../../scripts/removePuzzles.ts";

export default {
  fetch: withSupabase({ auth: ["secret"] }, async () => {
    await removePuzzles().catch(() => {
      return Response.error();
    });

    return Response.json({
      status: "success",
    });
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/remove-puzzles' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
