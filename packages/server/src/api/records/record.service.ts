import * as models from "@daltonscharff/spelling-bee-core";
import { Record, Records } from "./record.interface";

export async function findAllInRoom(shortcode: string): Promise<Records> {
  return await models.Record.query()
    .withGraphJoined("[word, room]")
    .where(
      "roomId",
      "=",
      models.Room.query().select("id").where({ shortcode })
    );
}

// export async function create(guessedWord: string, username: string, shortcode: string): Promise<Record | null> {
//   try {

//   } catch (e) {
//     return null;
//   }
// }
