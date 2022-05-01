import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import { styled } from "@mui/material/styles";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {
  Puzzle,
  Record,
  Room,
} from "@daltonscharff/spelling-bee-shared/lib/interfaces";

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
  const { data: roomData, error: roomError } = useSWR<Room>(
    `/api/rooms/${shortcode}`,
    fetcher
  );
  const { data: puzzleData, error: puzzleError } = useSWR<Puzzle>(
    `/api/puzzles/newest`,
    fetcher
  );
  const { data: recordsData, error: recordsError } = useSWR<Record[]>(
    `/api/records/${shortcode}`,
    fetcher
  );

  const loading =
    (!roomData && !roomError) ||
    (!puzzleData && !puzzleError) ||
    (!recordsData && !recordsError);

  const error = roomError || puzzleError || recordsError;

  console.log({
    roomData,
    puzzleData,
    recordsData,
    loading,
    error,
  });
  if (loading) return <div>Loading</div>;
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
            outerLetters={puzzleData?.outerLetters ?? []}
            centerLetter={puzzleData?.centerLetter || ""}
            onSubmit={() => {}}
            disabled={!shortcode || error}
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
