import { getWords } from "../controllers/words";

const Word = {
  type: "object",
  properties: {
    id: { type: "string" },
    word: { type: "string" },
    pointValue: { type: "number" },
    definition: { type: "string" },
    partOfSpeech: { type: "string" },
    synonym: { type: "string", nullable: true },
    isPanagram: { type: "boolean" },
  },
};

const getWordsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Word,
      },
    },
  },
  handler: getWords,
};

export default async function wordRoutes(server, options, done) {
  server.get("/words", getWordsOpts);
}
