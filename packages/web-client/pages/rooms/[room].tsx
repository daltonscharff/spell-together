import type { NextPage } from "next";
import { useRouter } from "next/router";
import { socket } from "../../hooks/useSocket";
import useStore from "../../hooks/useStore";
import Hive from "../../components/Hive";

const Room: NextPage = () => {
  // const [room, setRoom] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const func = (eventName: string, args: any) => {
  //     console.log(eventName, args);
  //   };
  //   socket.onAny(func);
  //   return () => {
  //     socket.offAny(func);
  //   };
  // });

  // useEffect(() => {
  //   router.beforePopState(() => {
  //     socket.emit("leaveRoom", { user: "TEST USER", room });
  //     return true;
  //   });
  //   return () => {
  //     router.beforePopState(() => true);
  //   };
  // }, [room]);

  // useEffect(() => {
  //   if (room.length > 0) {
  //     socket.emit("joinRoom", { user: "TEST USER", room });
  //   }
  // }, [room]);

  // const roomCode = useStore((state) => state.roomCode);
  const letters = useStore((state) => state.letters);
  const centerLetter = useStore((state) => state.centerLetter);

  return (
    <div>
      Hello from room {router.query.room}
      <Hive letters={letters} centerLetter={centerLetter} />
    </div>
  );
};

export default Room;
