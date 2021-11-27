import type { NextPage } from "next";
import React, { useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import GameBoard from "../../components/room/GameBoard";
import SocketContext from "../../providers/socketContext";

const GameRoom: NextPage = () => {
  const socket = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      Cookies.set("roomCode", router.query.code ?? "", { sameSite: "strict" });
      socket.emit("room:join", { room: router.query.code });
    }
  }, [router]);

  useEffect(() => {
    const leaveRoom = () => {
      socket.emit("room:leave", { room: router.query.code });
      return true;
    };

    router.beforePopState(leaveRoom);
  }, []);

  // useEffect(() => {
  //   socket.onAny((eventName, ...args) => console.log({ eventName, ...args }));
  // }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {router.query.code}
      <GameBoard />
    </Container>
  );
};

export default GameRoom;
