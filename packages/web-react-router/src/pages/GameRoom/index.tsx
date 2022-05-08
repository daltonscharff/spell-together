import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import { styled } from "@mui/material/styles";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";

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
  const puzzle = usePuzzle();
  const room = useRoom(shortcode);

  const disabled = !shortcode || puzzle.error || room.error;

  if (puzzle.loading || room.loading) return <div>Loading</div>;
  console.log(room);

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
            outerLetters={puzzle.outerLetters}
            centerLetter={puzzle.centerLetter}
            onSubmit={() => {}}
            disabled={disabled}
          />
        </LetterInputProvider>
        <GameOutput />
      </Container>
    </>
  );
}
