import type { Timestamp } from "firebase/firestore";
import type { BaseType } from "./baseType";

export type PuzzleId = string;

export type Puzzle = BaseType & {
  date: Timestamp;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;
};
