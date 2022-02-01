export interface User {
  username: string;
  shortcode: string;
}

export interface Guess extends User {
  word: string;
}

export interface CorrectGuess extends Guess {
  foundAt: string;
  pointValue: number;
  isPangram: boolean;
}
