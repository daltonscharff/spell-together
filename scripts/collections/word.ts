import config from "../utils/config";
import { databases } from "../utils/appwriteClient";
import { faker } from "@faker-js/faker";

export type WordId = string;

export class Word {
  word: string = "";
  pointValue: number = 0;
  isPangram: boolean = false;
  partOfSpeech?: string;
  definition?: string;

  randomize() {
    this.word = faker.word.sample({ length: { min: 4, max: 14 } });
    this.pointValue = faker.number.int({ min: 2, max: 10 });
    this.isPangram = faker.datatype.boolean();
    this.partOfSpeech = faker.helpers.arrayElement([
      "noun",
      "pronoun",
      "verb",
      "adverb",
      "adjective",
      "preposition",
      "conjunction",
      "interjection",
    ]);
    this.definition = faker.lorem.sentence();
  }

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.WORD_COLLECTION_ID,
      "word"
    );

    await Promise.all([
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.WORD_COLLECTION_ID,
        "word",
        64,
        true
      ),
      databases.createIntegerAttribute(
        config.DATABASE_ID,
        config.WORD_COLLECTION_ID,
        "pointValue",
        true,
        0
      ),
      databases.createBooleanAttribute(
        config.DATABASE_ID,
        config.WORD_COLLECTION_ID,
        "isPangram",
        true
      ),
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.WORD_COLLECTION_ID,
        "partOfSpeech",
        64,
        false
      ),
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.WORD_COLLECTION_ID,
        "definition",
        2048,
        false
      ),
    ]);
  }
}
