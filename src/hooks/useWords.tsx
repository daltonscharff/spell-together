import useSWRImmutable from "swr/immutable";
import { fetcher } from "../utils/fetcher";
import { type Word, type WordWithPuzzleId } from "../types/database.types";

export function useWords(puzzleId?: string) {
  const { data, error } = useSWRImmutable<WordWithPuzzleId[]>(
    puzzleId !== undefined
      ? `word_with_puzzle_id?puzzle_id=eq.${puzzleId}`
      : null,
    fetcher
  );

  const wordsMappedById = new Map<Word["id"], Word>(
    data?.map((word) => [word.id, word])
  );

  const wordsMappedByWord = new Map<Word["word"], Word>(
    data?.map((word) => [word.word, word])
  );

  function isValidWord(testWord: string) {
    return wordsMappedByWord.get(testWord);
  }

  return {
    words: data,
    wordsMappedById,
    isValidWord,
    loading: !data && !error,
    error,
  };
}
