export type Guess = {
  created_at: string;
  id: string;
  is_correct: boolean;
  puzzle_id: string;
  room_id: string;
  submitted_by: string;
  word_id: string;
};

export type Puzzle = {
  center_letter: string;
  created_at: string;
  date: string;
  id: string;
  max_score: number;
  outer_letters: string[];
};

export type PuzzleToWord = {
  created_at: string;
  id: string;
  puzzle_id: string;
  word_id: string;
};

export type Room = {
  created_at: string;
  id: string;
  shortcode: string;
};

export type Word = {
  created_at: string;
  definition: string | null;
  id: string;
  is_pangram: boolean;
  part_of_speech: string | null;
  point_value: number;
  word: string;
};

export type WordWithPuzzleId = Word & Pick<PuzzleToWord, "puzzle_id">;
