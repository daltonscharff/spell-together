import { supabaseClient } from "../utils/supabaseClient.ts";

export class Word {
  word = "";
  point_value = 0;
  is_pangram = false;
  definition?: string;
  part_of_speech?: string;
  puzzle_id?: string;

  constructor(word: string) {
    this.word = word.toLowerCase();
    this.is_pangram = this.isPangram(word);
    this.point_value = this.calculatePointValue(word, this.is_pangram);
  }

  isPangram(word: string): boolean {
    const letterSet = new Set<string>();
    for (const letter of word.split("")) {
      letterSet.add(letter);
    }
    return letterSet.size === 7;
  }

  calculatePointValue(word: string, isPangram: boolean): number {
    let points = 0;
    if (word.length === 4) {
      points = 1;
    } else if (word.length > 4) {
      points = word.length;
    }
    if (isPangram) points += 7;
    return points;
  }

  async lookup() {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`
    );
    const result = await response.json();
    if (result && Array.isArray(result)) {
      this.definition = result[0].meanings[0].definitions[0].definition;
      this.part_of_speech = result[0].meanings[0].partOfSpeech;
    }
  }

  static addPoints(words: Word[]): number {
    return words.reduce((total, word) => total + word.point_value, 0);
  }

  static async saveAll(words: Word[], puzzleId?: string) {
    if (puzzleId) words.forEach((w) => (w.puzzle_id = puzzleId));
    const { error } = await supabaseClient.from("word").insert(words);
    if (error) throw new Error("Could not save words: " + error.message);
  }
}
