import config from "../utils/config";
import { databases } from "../utils/appwriteClient";
import type { UserId } from "./user";
import { RelationshipType } from "node-appwrite";
import { faker } from "@faker-js/faker";

export type RoomId = string;

export class Room {
  name?: string;
  users: UserId[] = [];
  owner: UserId = "";

  randomize(users: UserId[], owner: UserId) {
    this.name = faker.lorem.words({ min: 1, max: 3 });
    this.users = users;
    this.owner = owner;
  }

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
