import { Model } from "objection";

export default class Puzzle extends Model {
  id: string;
  date: string;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;

  static tableName = "puzzle";
}
