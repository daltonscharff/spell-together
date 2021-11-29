import type { NextPage } from "next";
import React, { useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import GameBoard from "../../components/room/GameBoard";
import SocketContext from "../../providers/socketContext";
import { useRecoilState, useResetRecoilState } from "recoil";
import { roomState } from "../../atoms/socketState";

const GameRoom: NextPage = () => {
  const [room, setRoom] = useRecoilState(roomState);
  const resetRoom = useResetRecoilState(roomState);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.room === "string") {
      setRoom(router.query.room);
    }
  }, [router]);

  useEffect(() => {
    router.beforePopState(() => {
      resetRoom();
      return true;
    });
  }, [router]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {room}
      <GameBoard />
    </Container>
  );
};

export default GameRoom;
