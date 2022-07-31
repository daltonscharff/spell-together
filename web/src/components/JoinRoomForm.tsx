import { useForm } from "react-hook-form";
import { useLocalStore } from "../hooks/useLocalStore";

export const JoinRoomForm = () => {
  const shortcode = useLocalStore((state) => state.shortcode);
  const username = useLocalStore((state) => state.username);

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
    console.log("submitted", data);
    useLocalStore.setState({ username: data.username });
    useLocalStore.setState({ shortcode: data.shortcode });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          className={`input input-bordered ${errors.username && "input-error"}`}
          type="text"
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
        {errors.username && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.username.message}
            </span>
          </label>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Room Code</span>
        </label>
        <input
          className={`input input-bordered ${
            errors.shortcode && "input-error"
          }`}
          type="text"
          {...register("shortcode", {
            required: {
              value: true,
              message:
                "Please provide the code of the room you would like to join",
            },
            pattern: {
              value: /^[A-Za-z0-9]{6}$/,
              message: "Please provide a valid, 6 character room code",
            },
          })}
        />
        {errors.shortcode && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.shortcode.message}
            </span>
          </label>
        )}
      </div>
      <button type="submit" className="btn btn-outline px-8 m-6">
        Join
      </button>
    </form>
  );
};
