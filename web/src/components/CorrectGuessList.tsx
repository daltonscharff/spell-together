import { Box } from "@mui/material";
import { definitions } from "../types/supabase";

type CorrectGuessListProps = {
  correctGuesses?: definitions["correct_guess"][];
};

export const CorrectGuessList = ({
  correctGuesses = [],
}: CorrectGuessListProps) => {
  return (
    <Box>
      {correctGuesses.map((guess) => (
        <Box key={guess.word_id}>
          <Box sx={{ transform: "capitalize" }}>{guess.word}</Box>
          <Box>{guess.username}</Box>
          <Box>{guess.definition}</Box>
        </Box>
      ))}
    </Box>
  );
};
