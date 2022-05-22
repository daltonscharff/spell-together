import { supabaseClient } from "../utils/supabaseClient.ts";

export class Puzzle {
  id = "";
  date = new Date();
  outer_letters: string[] = [];
  center_letter = "";
  max_score = 0;

  async save() {
    const { data, error } = await supabaseClient.from("puzzle").insert([
      {
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
