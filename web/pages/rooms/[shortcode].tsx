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
        <input type="text" value={letters} onChange={() => {}} />
      </section>

      <section>
        <Hive
          outerLetters={outerLetters}
          centerLetter={puzzle?.center_letter || ""}
          onClick={(letter) => addLetter(letter)}
        />
        <button onClick={removeLetter}>delete</button>
        <button
          onClick={() =>
            setOuterLetters((outerLetters) => shuffle(outerLetters))
          }
        >
          shuffle
        </button>
        <button
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
        </button>
      </section>

      <section>
        <table>
          <thead>
            <tr>
              <th>word</th>
              <th>point value</th>
              <th>username</th>
              <th>part of speech</th>
              <th>definition</th>
              <th>pangram</th>
            </tr>
          </thead>
          <tbody>
            {correctGuesses.map((guess) => {
              return (
                <tr key={guess.guess_id}>
                  <td>{guess.word}</td>
                  <td>{guess.point_value}</td>
                  <td>{guess.username}</td>
                  <td>{guess.part_of_speech}</td>
                  <td>{guess.definition}</td>
                  <td>{guess.is_pangram?.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
