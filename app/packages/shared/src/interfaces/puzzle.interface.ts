export default interface Puzzle {
  id: string;
  date: string;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;
}
