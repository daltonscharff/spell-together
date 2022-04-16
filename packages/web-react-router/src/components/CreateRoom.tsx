import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

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
        <>
          <div>{roomUrl}</div>
          <button onClick={onGoToRoomClick}>Go to room</button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onCreateRoomSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("username", {
                required: {
                  value: true,
                  message: "Please provide your name",
                },
                maxLength: {
                  value: 24,
                  message: "Please limit your name to 24 characters",
                },
              })}
            />
            {errors.username?.message}
          </div>
          <input type="submit" value="Submit" />
        </form>
      )}
    </>
  );
}
