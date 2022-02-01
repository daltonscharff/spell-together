import * as models from "@daltonscharff/spelling-bee-core";
import { Record } from "../interfaces";

export async function findAllInRoom(
  shortcode: string,
  graphJoinString: string = ""
): Promise<Record[]> {
  return await models.Record.query()
    .withGraphJoined(graphJoinString)
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
    const record = await models.Record.query().insertAndFetch({
      username,
      roomId: models.Room.query().select("id").where({ shortcode }),
      wordId: models.Word.query().select("id").where({ word }),
    });
    return record;
  } catch (e) {
    return null;
  }
}
