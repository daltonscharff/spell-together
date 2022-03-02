import { useStore } from "../store";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function generateRoomUrl(shortcode: string) {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/rooms/${shortcode.toUpperCase()}`;
}

export function CreateRoom() {
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
      username: useStore((state) => state.username),
      shortcode: useStore((state) => state.shortcode),
    },
  });

  const onSubmit = (data: { username: string; shortcode: string }) => {
    if (Object.entries(errors).length !== 0) {
      return;
    }
    setShortcode("abc123");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {shortcode && (
        <>
          <input type="text" readOnly value={roomUrl} />
        </>
      )}
    </form>
  );
}
