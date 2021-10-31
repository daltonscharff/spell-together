import type { NextPage } from "next";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";

const Home: NextPage = () => {
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
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Room Code"
          variant="outlined"
          margin="normal"
          name="roomCode"
          fullWidth
          required
        />
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          name="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
