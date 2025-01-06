import config from "config";
import { databases } from "../appwriteClient";

export type UserId = string;

export class User {
  email?: string;
  name: string;

  static async createCollection() {
    await databases.createCollection(
      config.DATABASE_ID,
      config.USER_COLLECTION_ID,
      "user"
    );

    await Promise.all([
      databases.createEmailAttribute(
        config.DATABASE_ID,
        config.USER_COLLECTION_ID,
        "email",
        false
      ),
      databases.createStringAttribute(
        config.DATABASE_ID,
        config.USER_COLLECTION_ID,
        "name",
        128,
        true
      ),
    ]);
  }
}
