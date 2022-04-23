import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useUser";

export function JoinRoom() {
  const navigate = useNavigate();
  const { username, setUsername, shortcode, setShortcode } = useStore();

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
      <div>
        <input
          type="text"
          placeholder="Room Code"
          {...register("shortcode", {
            required: true,
            pattern: {
              value: /[A-Za-z0-9]{6}/i,
              message: "Please provide a valid, 6 character room code",
            },
          })}
        />
        {errors.shortcode?.message}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
