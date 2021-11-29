import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import InputTextField from "../components/InputTextField";

const Home: NextPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomCode: "",
      name: "",
    },
  });

  const onSubmit = (data: { roomCode: string; name: string }) => {
    console.log({
      roomCode: data.roomCode,
      name: data.name,
    });
    router.push({
      pathname: `/rooms/${data.roomCode}`,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component="form">
        <InputTextField
          name="roomCode"
          label="Room Code"
          control={control}
          helperText={errors.roomCode?.message}
          rules={{
            required: {
              value: true,
              message: "Please provide a room code to join",
            },
            maxLength: {
              value: 4,
              message: "Room codes must be 4 characters",
            },
            minLength: {
              value: 4,
              message: "Room codes must be 4 characters",
            },
          }}
        />
        <InputTextField
          name="name"
          label="Name"
          control={control}
          helperText={errors.name?.message}
          rules={{
            required: {
              value: true,
              message: "Please enter your name",
            },
            maxLength: {
              value: 24,
              message: "Names must be less than 25 characters",
            },
            minLength: {
              value: 3,
              message: "Names must be longer than 2 characters",
            },
          }}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 2, mb: 2, fontWeight: 700, textTransform: "none" }}
        >
          Join
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
