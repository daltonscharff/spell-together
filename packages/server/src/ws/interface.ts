export interface BaseGuess {
  user: string;
  code: string;
  word: string;
}

export interface Guess extends BaseGuess {
  valid: boolean;
}

export interface FoundWord {
  user: string;
  foundAt: string;
  word: string;
  pointValue: number;
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
  isPangram: boolean;
}

export interface updateFoundWords {
  newWord: FoundWord;
  foundWords: FoundWord[];
  score: number;
}
