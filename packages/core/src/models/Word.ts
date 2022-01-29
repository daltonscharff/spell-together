import { Model } from "objection";

export default class Word extends Model {
  id: string;
  word: string;
  pointValue: number;
  isPangram: boolean;
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;

  static tableName = "word";
}
