import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

const Home: NextPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      roomCode: "",
      name: "",
    },
  });

  useEffect(() => {
    setValue("roomCode", Cookies.get("roomCode") ?? "");
    setValue("name", Cookies.get("name") ?? "");
  }, []);

  const onSubmit = (data: { roomCode: string; name: string }) => {
    console.log({
      roomCode: data.roomCode,
      name: data.name,
    });
    Cookies.set("roomCode", data.roomCode, { sameSite: "strict" });
    Cookies.set("name", data.name, { sameSite: "strict" });
    router.push({
      pathname: `/rooms/${data.roomCode}`,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component="form">
        <Controller
          name={"roomCode"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { invalid } }) => (
            <TextField
              label="Room Code"
              variant="outlined"
              margin="normal"
              value={value}
              onChange={onChange}
              error={invalid}
              helperText={errors.roomCode?.message}
              fullWidth
            />
          )}
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
        <Controller
          name={"name"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { invalid } }) => (
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              value={value}
              onChange={onChange}
              error={invalid}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
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
