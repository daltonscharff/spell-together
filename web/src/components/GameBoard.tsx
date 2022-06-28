import { useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
import { Hive } from "./Hive";
import { Button, Container, Grid, Card, Typography } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { Room, Puzzle, CorrectGuess } from "../types/supabase";
import { useLetterInput } from "../hooks/useLetterInput";
import { useKeyboardEvents } from "../hooks/useKeyboardEvents";
import { LetterInput } from "./LetterInput";
import { CorrectGuessList } from "./CorrectGuessList";
import { PointDisplay } from "./PointDisplay";
import { Header } from "./Header";

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
  useKeyboardEvents({
    onLetter: addLetter,
    onBackspace: removeLetter,
    onEnter: handleSubmit,
    disabled,
  });

  const [outerLetters, setOuterLetters] = useState<string[]>([]);

  function handleSubmit() {
    onSubmit({
      word: letters,
      username: "fromRoom",
      puzzleId: puzzle.id,
      roomId: room.id,
    });
    clearLetters();
  }

  useEffect(() => {
    if (puzzle.outer_letters) setOuterLetters(puzzle.outer_letters as string[]);
  }, [puzzle.outer_letters]);

  return (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid item sm={6}>
            <LetterInput
              value={letters}
              outerLetters={outerLetters}
              centerLetter={puzzle?.center_letter || ""}
            />
            <Hive
              outerLetters={outerLetters}
              centerLetter={puzzle?.center_letter || ""}
              onClick={(letter) => addLetter(letter)}
            />
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={4}>
                <Button onClick={removeLetter}>Delete</Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() =>
                    setOuterLetters((outerLetters) => shuffle(outerLetters))
                  }
                >
                  <LoopIcon fontSize="large" />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={handleSubmit}>Enter</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Card variant="outlined">
              <PointDisplay
                currentScore={correctGuesses.reduce(
                  (total, guess) => (total += guess.point_value || 0),
                  0
                )}
                maxScore={puzzle.max_score}
              />
            </Card>
            <Card variant="outlined">
              <Typography>Found Words: {correctGuesses.length}</Typography>
              <CorrectGuessList correctGuesses={correctGuesses} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
