import { supabaseClient } from "../utils/supabaseClient.ts";

export class Puzzle {
  id = "";
  date = "";
  outer_letters: string[] = [];
  center_letter = "";
  max_score = 0;

  async save() {
    const select = await supabaseClient
      .from("puzzle")
      .select("id")
      .eq("date", this.date);
    if (select.data && select.data.length > 0) {
      if (Deno.env.get("ENVIRONMENT") === "production") {
        throw new Error(
          `Could not save puzzle: puzzle already exists with date ${this.date}`
        );
      } else {
        await supabaseClient
          .from("puzzle")
          .delete()
          .eq("id", select.data[0].id);
      }
    }

    const { data, error } = await supabaseClient.from("puzzle").upsert([
      {
        id: this.id || undefined,
        date: this.date,
        outer_letters: this.outer_letters,
        center_letter: this.center_letter,
        max_score: this.max_score,
      },
    ]);

    if (error || !data)
      throw new Error("Could not save puzzle: " + error.message);
    this.id = data[0].id;
    return data[0];
  }
}
