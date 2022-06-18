import { useEffect, useState } from "react";
import { Puzzle } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

export const defaultPuzzle: Puzzle = {
  id: "",
  created_at: "",
  date: "",
  outer_letters: [],
  center_letter: "",
  max_score: 0,
};

export const usePuzzle = (puzzleId: string) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(defaultPuzzle);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRooms() {
      setLoading(true);
      const { data } = await supabase
        .from<Puzzle>("puzzle")
        .select("*")
        .eq("id", puzzleId);
      if (data) setPuzzle(data[0]);
      setLoading(false);
    }

    if (puzzleId) {
      loadRooms();
    }
  }, [puzzleId]);

  return {
    puzzle,
    loading,
  };
};
