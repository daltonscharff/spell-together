import type { BaseType } from "./baseType";

export type WordId = string; // word value

export type Word = BaseType & {
  pointValue: number;
  isPangram: boolean;
  partOfSpeech?: string;
  definition?: string;
};
