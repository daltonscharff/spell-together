import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import InputTextField from "../components/InputTextField";
import Header from "../components/Header";
import Button from "../components/Button";
import LetterInput from "../components/LetterInput";

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
    <div className="container max-w-md mx-auto h-screen pt-2 pb-8 px-6">
      <div className="flex flex-col gap-4 h-full">
        <Header />
        {/* <LetterInput placeholder="Room code" />
        <LetterInput placeholder="Your name" /> */}
        <div className="grow" />
        <Button>Join</Button>
      </div>
      {/* <form>
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
        <button onClick={handleSubmit(onSubmit)} type="submit">
          Join
        </button>
      </form> */}
    </div>
  );
};

export default Home;
