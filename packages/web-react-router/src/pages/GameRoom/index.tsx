import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import { styled } from "@mui/material/styles";
import { usePuzzle } from "../../hooks/usePuzzle";

type Props = {
  shortcode?: string;
};

const SelectRoomModal = styled(ModalWrapper)`
  background: white;
  max-width: 600px;
  width: 75%;
  padding: 2em 1.5em;
  margin-top: 3em;
  box-shadow: 0px 0px 8px 0px #0002;
`;

const Container = styled("div")`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 1em;

  @media (max-width: 640px) {
    grid-auto-flow: row;
  }
`;

export function GameRoom({ shortcode }: Props) {
  // const { data: roomData, error: roomError } = useSWR<Room>(
  //   `/api/rooms/${shortcode}`,
  //   fetcher
  // );
  // const { data: puzzleData, error: puzzleError } = useSWR<Puzzle>(
  //   `/api/puzzles/newest`,
  //   fetcher
  // );
  // const { data: recordsData, error: recordsError } = useSWR<Record[]>(
  //   `/api/records/${shortcode}`,
  //   fetcher
  // );

  // const loading =
  //   (!roomData && !roomError) ||
  //   (!puzzleData && !puzzleError) ||
  //   (!recordsData && !recordsError);

  // const error = roomError || puzzleError || recordsError;

  // console.log({
  //   roomData,
  //   puzzleData,
  //   recordsData,
  //   loading,
  //   error,
  // });
  // if (loading) return <div>Loading</div>;
  const { outerLetters, centerLetter } = usePuzzle();
  const disabled =
    !shortcode || outerLetters.length !== 6 || centerLetter.length !== 1;

  return (
    <>
      {!shortcode && (
        <SelectRoomModal>
          <SelectRoom />
        </SelectRoomModal>
      )}
      <Container>
        <LetterInputProvider>
          <GameInput
            outerLetters={outerLetters}
            centerLetter={centerLetter}
            onSubmit={() => {}}
            disabled={disabled}
          />
        </LetterInputProvider>
        <GameOutput />
      </Container>
    </>
  );
}
