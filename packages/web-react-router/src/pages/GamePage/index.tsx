import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoomModal } from "./SelectRoomModal";

export function GamePage() {
  return (
    <>
      GamePage
      <SelectRoomModal />
      <GameInput />
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
