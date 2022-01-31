import { Record, Room, Word } from "@daltonscharff/spelling-bee-core";
import { BaseGuess, FoundWord, Guess } from "./interface";

async function createRecord(guess: BaseGuess): Promise<Guess> {
  try {
    await prisma.$queryRaw`
      INSERT INTO 
        record
        (
          "user",
          "roomId",
          "wordId"
        )
      VALUES
      (
        ${guess.user},
        (
          SELECT
            id
          FROM
            room
          WHERE
            code = ${guess.code}
        ),
        (
          SELECT
            id
          FROM
            word
          WHERE
            word = ${guess.word}
        )
      )
    `;
    return { ...guess, valid: true };
  } catch (e) {
    return { ...guess, valid: false };
  }
}

async function findWordsInRoom(shortcode: string): Promise<FoundWord[]> {
  const query = Record.query()
    .where("roomId", "=", Room.query().where({ shortcode }).returning("id"))
    .withGraphFetched(["room", "word"])
    .toKnexQuery()
    .toSQL();
  console.log(query);
  const rows = await Record.query()
    .where("roomId", "=", Room.query().where({ shortcode }).returning("id"))
    .withGraphFetched(["room", "word"]);

  // const rows = await prisma.$queryRaw<
  //   (Record & Room & Word & { createdAt: string })[]
  // >`
  //   SELECT
  //     *,
  //     record.id AS "id",
  //     record."createdAt" as "createdAt"
  //   FROM
  //     record
  //     JOIN word ON word.id = record."wordId"
  //     JOIN room ON room.id = record."roomId"
  //   WHERE
  //     "roomId" = (
  //       SELECT id
  //       FROM room
  //       WHERE code = ${code}
  //     );
  // `;
  const foundWords: FoundWord[] = rows.map((row) => ({
    user: row.user,
    foundAt: row.createdAt,
    word: row.word,
    pointValue: row.pointValue,
    definition: row.definition,
    partOfSpeech: row.partOfSpeech,
    synonym: row.synonym,
    isPangram: row.isPangram,
  }));
  return foundWords;
}
