export interface Word {
  word: string;
  pointValue: number;
  isPangram: boolean;
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
}
