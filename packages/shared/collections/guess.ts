import { type RoomId } from "./room";
import { type UserId } from "./user";
import { type WordId } from "./word";
import { type PuzzleId } from "./puzzle";
import { databases } from "../appwriteClient";
import { RelationshipType } from "node-appwrite";
import config from "config";

export type GuessId = string;

export class Guess {
  userId: UserId;
  roomId: RoomId;
  puzzleId: PuzzleId;
  wordId: WordId;
  isCorrect: boolean;

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      "guess"
    );

    await databases.createRelationshipAttribute(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      config.USER_COLLECTION_ID,
      RelationshipType.ManyToOne,
      false,
      "userId"
    );
    await databases.createRelationshipAttribute(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      config.ROOM_COLLECTION_ID,
      RelationshipType.ManyToOne,
      false,
      "roomId"
    );
    await databases.createRelationshipAttribute(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      config.PUZZLE_COLLECTION_ID,
      RelationshipType.ManyToOne,
      false,
      "puzzleId"
    );
    await databases.createRelationshipAttribute(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      config.WORD_COLLECTION_ID,
      RelationshipType.ManyToOne,
      false,
      "wordId"
    );
    await databases.createBooleanAttribute(
      config.DATABASE_ID,
      config.GUESS_COLLECTION_ID,
      "isCorrect",
      true
    );
  }
}
