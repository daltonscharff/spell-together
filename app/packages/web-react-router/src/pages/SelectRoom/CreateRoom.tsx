import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

function generateRoomUrl(shortcode: string) {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/rooms/${shortcode.toUpperCase()}`;
}

export function CreateRoom() {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();

  const [shortcode, setShortcode] = useState<string>("");
  const [roomUrl, setRoomUrl] = useState<string>("");

  useEffect(() => {
    setRoomUrl(generateRoomUrl(shortcode));
  }, [shortcode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username ?? "",
    },
  });

  const onCreateRoomSubmit = (data: { username: string }) => {
    if (Object.entries(errors).length !== 0) {
      return;
    }
    setUsername(data.username);
    setShortcode("abc123");
  };

  const onGoToRoomClick = () => {
    navigate(`/rooms/${shortcode}`);
  };

  return (
    <>
      {shortcode ? (
        <Form>
          <TextField
            variant="standard"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy room URL"
                    onClick={() => {
                      navigator.clipboard.writeText(roomUrl);
                    }}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={roomUrl}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "auto", mt: ".5em" }}
            onClick={onGoToRoomClick}
          >
            Go to room
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit(onCreateRoomSubmit)}>
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
          <Box sx={{ display: "flex", mt: ".5em" }}>
            <Button type="submit" variant="contained" sx={{ margin: "auto" }}>
              Create Room
            </Button>
          </Box>
        </Form>
      )}
    </>
  );
}
