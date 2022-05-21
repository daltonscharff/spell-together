import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";
import Grid from "@mui/material/Grid";

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LetterInputProvider>
              <GameInput
                outerLetters={puzzle.outerLetters}
                centerLetter={puzzle.centerLetter}
                onSubmit={() => {}}
                disabled={disabled}
              />
            </LetterInputProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <GameOutput />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
