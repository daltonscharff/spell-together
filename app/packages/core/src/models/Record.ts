import { Model } from "objection";
import Room from "./Room";
import Word from "./Word";

export default class Record extends Model {
  id: string;
  createdAt: string;
  username: string;
  roomId: string;
  wordId: string;
  room: Room;
  word: Word;

  static tableName = "record";
  static relationMappings = () => ({
    room: {
      relation: Model.BelongsToOneRelation,
      modelClass: Room,
      join: {
        from: "record.roomId",
        to: "room.id",
      },
    },
    word: {
      relation: Model.BelongsToOneRelation,
      modelClass: Word,
      join: {
        from: "record.wordId",
        to: "word.id",
      },
    },
  });
}
