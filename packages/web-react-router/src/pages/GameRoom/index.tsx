import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import { styled } from "@mui/material/styles";

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
            outerLetters={["b", "c", "d", "e", "f", "g"]}
            centerLetter={"a"}
            onSubmit={() => {}}
            disabled={!shortcode}
          />
        </LetterInputProvider>
        <GameOutput />
      </Container>
    </>
  );
}

// const shortcode = "vqlslp";
// const { loadRoom, roomData, puzzleData, recordsData, clearRecords } =
//   useRoom(shortcode);

// useEffect(() => {
//   loadRoom();
// }, []);
// // let params = useParams();
// // const setShortcode = useStore((state) => state.setShortcode);
// // if (params.shortcode) setShortcode(params.shortcode);
// // const shortcode = useStore((state) => state.shortcode);

// // const { data: puzzleData, error: puzzleError } = useSWR(
// //   "api/puzzles/newest",
// //   fetcher
// // );

// // console.log({ puzzleData, puzzleError });

// // const { data: roomData, error: roomError } = useSWR(
// //   `api/rooms/${shortcode}`,
// //   fetcher
// // );

// // console.log({ roomData, roomError });

// return (
//   <>
//     {shortcode}
//     Puzzle: {JSON.stringify(puzzleData)}
//     Room: {JSON.stringify(roomData)}
//     Records: {JSON.stringify(recordsData)}
//     <button onClick={clearRecords}>Clear</button>
//   </>
// );
