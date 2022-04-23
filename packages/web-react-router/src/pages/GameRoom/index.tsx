import { GameInput } from "./GameInput";
import { GameOutput } from "./GameOutput";
import { SelectRoom } from "../SelectRoom";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LetterInputProvider } from "../../contexts/LetterInputContext";
import styled from "styled-components";

type Props = {
  showSelectRoomModal?: boolean;
};

const SelectRoomModal = styled(ModalWrapper)`
  background: white;
  max-width: 600px;
  width: 80%;
  padding: 1em;
  margin-top: 3em;
  box-shadow: 0px 0px 8px 0px #0002;
`;

export function GameRoom({ showSelectRoomModal }: Props) {
  return (
    <>
      GameRoom
      {showSelectRoomModal && (
        <SelectRoomModal>
          <SelectRoom />
        </SelectRoomModal>
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
