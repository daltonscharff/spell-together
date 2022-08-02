import { CtaButton } from "./CtaButton";
import { TabGroup } from "./TabGroup";
import { TextInput } from "./TextInput";
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "../hooks/useLocalStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateShortcode } from "../utils/validateShortcode";

export const JoinOrCreateRoomForm = () => {
  const shortcode = useLocalStore((state) => state.shortcode);
  const username = useLocalStore((state) => state.username);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username,
      shortcode,
    },
  });

  const onJoinSubmit = async (data: {
    username: string;
    shortcode: string;
  }) => {
    setIsLoading(true);
    if (Object.entries(errors).length !== 0) {
      return;
    }
    useLocalStore.setState({ username: data.username });

    if (await validateShortcode(data.shortcode)) {
      useLocalStore.setState({ shortcode: data.shortcode });
      navigate(`/rooms/${data.shortcode}`);
    } else {
      setError("shortcode", {
        type: "string",
        message: "Room code is invalid",
      });
    }
    setIsLoading(false);
  };

  const onCreateSubmit = (data: { username: string }) => {
    console.log("submitted", data);
    if (errors.username) {
      return;
    }
    useLocalStore.setState({ username: data.username });
  };

  return (
    <TabGroup
      tabs={[
        {
          label: "Join",
          element: (
            <form
              onSubmit={handleSubmit(onJoinSubmit)}
              className="flex flex-col gap-2"
            >
              <p className="p-4 text-center font-light">
                Join an existing room
              </p>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please provide a username",
                  },
                  maxLength: {
                    value: 24,
                    message: "Please limit your username to 24 characters",
                  },
                }}
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <TextInput
                    {...{ name, value, onChange, onBlur }}
                    icon="user"
                    placeholder="Your name"
                    solid
                    error={error?.message}
                  />
                )}
              />
              <div className="flex gap-2">
                <Controller
                  name="shortcode"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please provide a room code",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]{6}$/,
                      message: "Please provide a valid, 6 character room code",
                    },
                  }}
                  render={({
                    field: { name, value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      {...{ name, value, onChange, onBlur }}
                      icon="hash"
                      placeholder="Room code"
                      error={error?.message}
                    />
                  )}
                />
                <div>
                  <CtaButton type="submit" disabled={isLoading}>
                    Go
                  </CtaButton>
                </div>
              </div>
            </form>
          ),
        },
        {
          label: "Create",
          element: (
            <form
              onSubmit={handleSubmit(onCreateSubmit)}
              className="flex flex-col gap-2"
            >
              <p className="p-4 text-center font-light">Create a new room</p>
              <div className="flex gap-2">
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please provide a username",
                    },
                    maxLength: {
                      value: 24,
                      message: "Please limit your username to 24 characters",
                    },
                  }}
                  render={({
                    field: { name, value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      {...{ name, value, onChange, onBlur }}
                      icon="user"
                      placeholder="Your name"
                      solid
                      error={error?.message}
                    />
                  )}
                />
                <div>
                  <CtaButton type="submit">Create</CtaButton>
                </div>
              </div>
            </form>
          ),
        },
      ]}
    />
  );
};
