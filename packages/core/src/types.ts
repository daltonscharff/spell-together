export type FoundWord = {
  user: string;
  foundAt: string;
  word: string;
  pointValue: number;
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
  isPangram: boolean;
};

/** REST API */
export type GetRoomRequest = {
  code: string;
};

export type PostRoomRequest = {
  name: string;
};

export type RoomResponse = {
  code: string;
  name: string;
  foundWords: FoundWord[];
};

export type GetPuzzleRequest = {
  date?: string;
};

export type PuzzleResponse = {
  date: string;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;
};

/** WEBSOCKETS */
export type SubmitGuess = {
  user: string;
  code: string;
  word: string;
};

export type GuessResponse = {
  valid: boolean;
  message?: string;
};

export type UpdateRoom = {
  newWord: FoundWord;
  foundWords: FoundWord[];
  score: number;
};
