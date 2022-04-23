import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";

type Props = {
  showSelectRoomModal?: boolean;
};

export function GameRoom({ showSelectRoomModal }: Props) {
  return (
    <>
      GameRoom
      {showSelectRoomModal && (
        <ModalWrapper>
          <SelectRoom />
        </ModalWrapper>
      )}
      <LetterInputProvider>
        <GameInput />
      </LetterInputProvider>
      <GameOutput />
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
