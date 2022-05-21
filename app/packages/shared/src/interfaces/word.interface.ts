export default interface Word {
  id: string;
  word: string;
  pointValue: number;
  isPangram: boolean;
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
}
