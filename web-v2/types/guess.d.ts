import type { BaseType } from "./baseType";
import type { UserId } from "./user";
import type { WordId } from "./word";

export type GuessId = string;

export type Guess = BaseType & {
  userId: UserId;
  gameId: GameId;
  wordId: WordId;
  isCorrect: boolean;
};
