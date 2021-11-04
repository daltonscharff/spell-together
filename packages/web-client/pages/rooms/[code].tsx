import type { NextPage } from "next";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import GameBoard from "../../components/room/GameBoard";

const GameRoom: NextPage = () => {
  const router = useRouter();
  Cookies.set("roomCode", router.query.code ?? "", { sameSite: "strict" });

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {router.query.code}
      <GameBoard />
    </Container>
  );
};

export default GameRoom;
