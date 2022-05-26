import Link from "next/link";
import { useRooms } from "../hooks/useRooms";
import { useGuesses } from "../hooks/useGuesses";

export default function QueryPage() {
  const { rooms, loading: loadingRooms } = useRooms();
  const {
    correctGuesses,
    loading: loadingCorrectGuesses,
    submitGuess,
  } = useGuesses(rooms[0]?.id);

  if (loadingCorrectGuesses || loadingRooms) return <div>Loading...</div>;
  const words = ["officially", "colic", "local"];
  return (
    <>
      <h1>Test api queries</h1>
      <div>Rooms:</div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.shortcode}</li>
        ))}
      </ul>
      <div>Guesses:</div>
      <ul>
        {correctGuesses.map((guess) => (
          <li key={guess.guess_id}>
            {guess.word} | {guess.point_value}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={async () => {
            const index = Math.floor(Math.random() * words.length);
            const word = words[index];
            console.log("submitting", word);
            const guess = await submitGuess({
              username: "fromQueries",
              word,
              roomId: rooms[0].id,
              puzzleId: "c63d6527-6930-4a97-b704-ccdc5c9b041f", //change this
            });
            console.log(guess);
          }}
        >
          Submit guess
        </button>
      </div>
      <Link href="/">
        <button>Go away</button>
      </Link>
    </>
  );
}
