export interface BaseGuess {
  user: string;
  code: string;
  word: string;
}

export interface Guess extends BaseGuess {
  valid: boolean;
}
