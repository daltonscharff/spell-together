import config from "../utils/config";
import { databases } from "../utils/appwriteClient";
import type { WordId } from "./word";
import { RelationshipType } from "node-appwrite";

export type PuzzleId = string;

export class Puzzle {
  date: Date = new Date(0);
  outerLetters: string[] = [];
  centerLetter: string = "";
  maxScore: number = 0;
  words: WordId[] = [];

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.PUZZLE_COLLECTION_ID,
      "puzzle"
    );

    await Promise.all([
      databases.createDatetimeAttribute(
        config.DATABASE_ID,
        config.PUZZLE_COLLECTION_ID,
        "date",
        true
      ),
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.PUZZLE_COLLECTION_ID,
        "outerLetters",
        1,
        true,
        undefined,
        true
      ),
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.PUZZLE_COLLECTION_ID,
        "centerLetter",
        1,
        true
      ),
      databases.createIntegerAttribute(
        config.DATABASE_ID,
        config.PUZZLE_COLLECTION_ID,
        "maxScore",
        true,
        0
      ),
      databases.createRelationshipAttribute(
        config.DATABASE_ID,
        config.PUZZLE_COLLECTION_ID,
        config.WORD_COLLECTION_ID,
        RelationshipType.ManyToMany,
        false,
        "words"
      ),
    ]);
  }
}
