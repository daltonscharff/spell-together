import type { NextPage } from "next";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

const GameRoom: NextPage = () => {
  const router = useRouter();
  Cookies.set("roomCode", router.query.code ?? "", { sameSite: "strict" });
  console.log(router.query.code);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {router.query.code}
    </Container>
  );
};

export default GameRoom;
