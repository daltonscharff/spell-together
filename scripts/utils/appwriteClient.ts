import * as sdk from "node-appwrite";
import config from "./config";

export const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(config.APPWRITE_PROJECT_ID)
  .setKey(config.APPWRITE_API_KEY);

export const databases = new sdk.Databases(client);
