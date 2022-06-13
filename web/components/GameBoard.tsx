import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
import { Hive } from "./Hive";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { Room, Puzzle, CorrectGuess } from "../types/supabase";
import { useLetterInput } from "../hooks/useLetterInput";
import { CaptureKeyboardEvents } from "./CaptureKeyboardEvents";

type GameBoardProps = {
  puzzle: Puzzle;
  room: Room;
  correctGuesses: CorrectGuess[];
  onSubmit: (guess: any) => any;
  disabled?: boolean;
};

export const GameBoard = ({
  puzzle,
  room,
  correctGuesses,
  onSubmit,
  disabled = false,
}: GameBoardProps) => {
  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();

  const [outerLetters, setOuterLetters] = useState<string[]>([]);

  function handleSubmit() {
    onSubmit({
      word: letters,
      username: "fromRoom",
      puzzleId: puzzle?.id || "",
      roomId: room?.id || "",
    });
    clearLetters();
  }

  useEffect(() => {
    if (puzzle?.outer_letters)
      setOuterLetters(puzzle.outer_letters as string[]);
  }, [puzzle?.outer_letters]);

  return (
    <>
      {!disabled && (
        <CaptureKeyboardEvents
          onBackspace={removeLetter}
          onLetter={addLetter}
          onEnter={handleSubmit}
        />
      )}
      <Container>
        <Grid container>
          <Grid item sm={6}>
            <Input type="text" value={letters} onChange={() => {}} />
            <Hive
              outerLetters={outerLetters}
              centerLetter={puzzle?.center_letter || ""}
              onClick={(letter) => addLetter(letter)}
            />
            <Grid container spacing={1} sx={{ textAlign: "center" }}>
              <Grid item xs={4}>
                <Button variant="outlined" onClick={removeLetter}>
                  delete
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setOuterLetters((outerLetters) => shuffle(outerLetters))
                  }
                >
                  shuffle
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" onClick={handleSubmit}>
                  submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Box>
              <Typography variant="h2">Found Words:</Typography>
              <Box>
                {correctGuesses.map((guess) => {
                  return (
                    <Chip
                      key={guess.guess_id}
                      variant="outlined"
                      avatar={
                        <Avatar>
                          {guess.username?.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      label={
                        <>
                          <span>{guess.word}_</span>
                          <span>{guess.point_value}</span>
                        </>
                      }
                    />
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
