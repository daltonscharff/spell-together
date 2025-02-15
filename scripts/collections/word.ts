import config from "../utils/config";
import { databases } from "../utils/appwriteClient";

export type WordId = string;

export class Word {
  pointValue: number = 0;
  isPangram: boolean = false;
  partOfSpeech?: string;
  definition?: string;

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.WORD_COLLECTION_ID,
      "word"
    );

    await Promise.all([
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
