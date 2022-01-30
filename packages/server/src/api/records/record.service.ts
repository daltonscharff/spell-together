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

export async function create(
  word: string,
  shortcode: string,
  username: string
): Promise<Record | null> {
  try {
    console.log("adding record");
    const record = await models.Record.query().insertAndFetch({
      username,
      roomId: models.Room.query().select("id").where({ shortcode }),
      wordId: models.Word.query().select("id").where({ word }),
    });
    console.log(record);
    return record;
  } catch (e) {
    console.log("already found");
    return null;
  }
}
