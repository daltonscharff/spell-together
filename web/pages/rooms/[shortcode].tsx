import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FoundWordDisplay } from "../../components/FoundWordDisplay";
import { PointDisplay } from "../../components/PointDisplay";
import { useGuesses } from "../../hooks/useGuesses";
import { useLetterInput } from "../../hooks/useLetterInput";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";
import shuffle from "../../utils/shuffle";
import { Hive } from "../../components/Hive";
import {
  Paper,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Input,
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
    <div>
      <section>
        <Input type="text" value={letters} onChange={() => {}} />
      </section>

      <section>
        <Paper>
          <Hive
            outerLetters={outerLetters}
            centerLetter={puzzle?.center_letter || ""}
            onClick={(letter) => addLetter(letter)}
          />

          <Button onClick={removeLetter}>delete</Button>
          <Button
            onClick={() =>
              setOuterLetters((outerLetters) => shuffle(outerLetters))
            }
          >
            shuffle
          </Button>
          <Button
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
        </Paper>
      </section>

      <section>
        <Paper>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>word</TableCell>
                <TableCell>point value</TableCell>
                <TableCell>username</TableCell>
                <TableCell>part of speech</TableCell>
                <TableCell>definition</TableCell>
                <TableCell>pangram</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {correctGuesses.map((guess) => {
                return (
                  <TableRow key={guess.guess_id}>
                    <TableCell>{guess.word}</TableCell>
                    <TableCell>{guess.point_value}</TableCell>
                    <TableCell>{guess.username}</TableCell>
                    <TableCell>{guess.part_of_speech}</TableCell>
                    <TableCell>{guess.definition}</TableCell>
                    <TableCell>{guess.is_pangram?.toString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </Paper>
      </section>
    </div>
  );
}
