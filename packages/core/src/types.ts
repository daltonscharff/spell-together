export type FoundWord = {
  user: string;
  foundAt: string;
  word: string;
  pointValue: number;
  definition: string | null;
  partOfSpeech: string | null;
  synonym: string | null;
  isPangram: boolean;
};
