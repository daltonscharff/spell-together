import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGuesses } from "../../hooks/useGuesses";
import { useLetterInput } from "../../hooks/useLetterInput";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";
import { shuffle } from "../../utils/shuffle";
import { Hive } from "../../components/Hive";
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

export default function GameRoom() {
  const router = useRouter();
  const shortcode = router.query.shortcode?.toString() || "";

  const { room, loading: loadingRoom } = useRoom(shortcode);
  const { puzzle, loading: loadingPuzzle } = usePuzzle(room?.puzzle_id || "");
  const {
    correctGuesses,
    submitGuess,
    loading: loadingGuesses,
  } = useGuesses(room?.id || "");

  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();

  const [outerLetters, setOuterLetters] = useState<string[]>([]);

  useEffect(() => {
    if (puzzle?.outer_letters)
      setOuterLetters(puzzle.outer_letters as string[]);
  }, [puzzle?.outer_letters]);

  if (loadingRoom || loadingPuzzle || loadingGuesses) return <div>Loading</div>;

  if (!room) {
    if (shortcode) return <div>Room does not exist</div>;
    return <div></div>;
  }

  return (
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
              <Button
                variant="outlined"
                onClick={() => {
                  submitGuess({
                    word: letters,
                    username: "fromRoom",
                    puzzleId: puzzle?.id || "",
                    roomId: room?.id || "",
                  });
                  clearLetters();
                }}
              >
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
                      <Avatar>{guess.username?.charAt(0).toUpperCase()}</Avatar>
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
  );
}
