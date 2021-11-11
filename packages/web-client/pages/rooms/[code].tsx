import type { NextPage } from "next";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import GameBoard from "../../components/room/GameBoard";
import SocketContext from "../../providers/socketContext";
import { useContext } from "react";
import { Socket } from "socket.io-client";

const GameRoom: NextPage = () => {
  const socket: Socket = useContext(SocketContext);
  const router = useRouter();
  Cookies.set("roomCode", router.query.code ?? "", { sameSite: "strict" });

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {router.query.code}
      <button onClick={() => socket.emit("hello", "hello message")}>
        Say Hello
      </button>
      <GameBoard />
    </Container>
  );
};

export default GameRoom;
