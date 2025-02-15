import config from "../utils/config";
import { databases } from "../utils/appwriteClient";
import type { WordId } from "./word";
import { RelationshipType } from "node-appwrite";
import { faker } from "@faker-js/faker";

export type PuzzleId = string;

export class Puzzle {
  date: Date = new Date(0);
  outerLetters: string[] = [];
  centerLetter: string = "";
  maxScore: number = 0;
  words: WordId[] = [];

  randomize(words: WordId[]) {
    this.date = faker.date.recent({ days: 7 });
    this.outerLetters = faker.string.alpha(6).split("");
    this.centerLetter = faker.string.alpha(1);
    this.maxScore = faker.number.int({ min: 100, max: 300 });
    this.words = words;
  }

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
