import type { NextPage } from "next";
import React, { useEffect, useContext, useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import GameBoard from "../../components/room/GameBoard";
import { SocketContext } from "../../providers/SocketProvider";

const GameRoom: NextPage = () => {
  const socket = useContext(SocketContext);
  const [room, setRoom] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.room === "string") {
      setRoom(router.query.room);
    }
    router.beforePopState(() => {
      socket.emit("room:leave", { room: router.query.room });
      return true;
    });
  }, [router]);

  useEffect(() => {
    if (room.length > 0) {
      socket.emit("room:join", { room });
    }
  }, [room]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {room}
      <GameBoard />
    </Container>
  );
};

export default GameRoom;
