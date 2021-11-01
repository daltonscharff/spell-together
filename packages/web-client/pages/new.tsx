import type { NextPage } from "next";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
import { useRouter } from "next/dist/client/router";

const New: NextPage = () => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      roomCode: data.get("roomCode"),
      password: data.get("password"),
    });
  };
  return (
    <Container component="main" maxWidth="sm">
      You made it
    </Container>
  );
};

export default New;
