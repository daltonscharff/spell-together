import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

export function JoinRoom() {
  const navigate = useNavigate();
  const { username, setUsername, shortcode, setShortcode } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username ?? "",
      shortcode: shortcode ?? "",
    },
  });

  const onSubmit = (data: { username: string; shortcode: string }) => {
    if (Object.entries(errors).length !== 0) {
      return;
    }
    setUsername(data.username);
    setShortcode(data.shortcode);
    navigate(`/rooms/${data.shortcode}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.username}
        label="Username"
        variant="standard"
        helperText={errors.username?.message}
        {...register("username", {
          required: {
            value: true,
            message: "Please provide a username",
          },
          maxLength: {
            value: 24,
            message: "Please limit your username to 24 characters",
          },
        })}
      />
      <TextField
        error={!!errors.shortcode}
        label="Room Code"
        variant="standard"
        helperText={errors.shortcode?.message}
        {...register("shortcode", {
          required: {
            value: true,
            message: "Please provide the code of a room to join",
          },
          pattern: {
            value: /^[A-Za-z0-9]{6}$/,
            message: "Please provide a valid, 6 character room code",
          },
        })}
      />
      <Box sx={{ display: "flex", mt: ".5em" }}>
        <Button type="submit" variant="contained" sx={{ margin: "auto" }}>
          Join Room
        </Button>
      </Box>
    </Form>
  );
}
