import config from "../utils/config";
import { databases } from "../utils/appwriteClient";
import type { UserId } from "./user";
import { RelationshipType } from "node-appwrite";

export type RoomId = string;

export class Room {
  name?: string;
  users: UserId[] = [];
  owner: UserId = "";

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.ROOM_COLLECTION_ID,
      "room"
    );

    await Promise.all([
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.ROOM_COLLECTION_ID,
        "name",
        64,
        false
      ),
      databases.createRelationshipAttribute(
        config.DATABASE_ID,
        config.ROOM_COLLECTION_ID,
        config.USER_COLLECTION_ID,
        RelationshipType.ManyToMany,
        true,
        "users",
        "rooms"
      ),
      databases.createRelationshipAttribute(
        config.DATABASE_ID,
        config.ROOM_COLLECTION_ID,
        config.USER_COLLECTION_ID,
        RelationshipType.ManyToOne,
        true,
        "owner",
        "ownedRooms"
      ),
    ]);
  }
}
