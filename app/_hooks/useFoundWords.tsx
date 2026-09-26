import { FieldOutputTypes } from "@/prisma/contract";

type Word = FieldOutputTypes["public"]["Word"];
type CorrectGuess = FieldOutputTypes["public"]["CorrectGuess"];
export type FoundWord = Omit<Word, "createdAt" | "updatedAt"> &
  Pick<CorrectGuess, "submittedAt" | "submittedBy">;

export function useFoundWords() {
  return {
    foundWords: [
      {
        id: 1,
        value: "planet",
        pointValue: 8,
        isPangram: false,
        partOfSpeech: "noun",
        definition: "A celestial body orbiting a star.",
        submittedAt: new Date("2026-09-26T12:00:00.000Z").toTemporalInstant(),
        submittedBy: "Alice",
      },
      {
        id: 2,
        value: "starlight",
        pointValue: 10,
        isPangram: true,
        partOfSpeech: "noun",
        definition: "The light emitted by stars.",
        submittedAt: new Date("2026-09-26T12:05:00.000Z").toTemporalInstant(),
        submittedBy: "Bob",
      },
      {
        id: 3,
        value: "orbit",
        pointValue: 7,
        isPangram: false,
        partOfSpeech: "noun",
        definition: "The curved path of an object around a star or planet.",
        submittedAt: new Date("2026-09-26T12:10:00.000Z").toTemporalInstant(),
        submittedBy: "Cara",
      },
    ] satisfies FoundWord[],
  };
}
