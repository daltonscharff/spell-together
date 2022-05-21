import { Model } from "objection";

export default class Room extends Model {
  id: string;
  createdAt: string;
  lastPlayed: string;
  shortcode: string;
  name?: string;

  static tableName = "room";
}
