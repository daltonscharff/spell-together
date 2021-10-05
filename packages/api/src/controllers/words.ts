import { Word } from "spelling-bee-core";

export const getWords = async (request, reply) => {
  let words = await Word.find();
  reply.send(words);
};
