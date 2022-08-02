import { CtaButton } from "./CtaButton";
import { TabGroup } from "./TabGroup";
import { TextInput } from "./TextInput";
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "../hooks/useLocalStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateShortcode } from "../utils/validateShortcode";
import { generateShortcode } from "../utils/generateShortcode";
import { supabase } from "../utils/supabaseClient";
import { Room } from "../types/supabase";

export const JoinOrCreateRoomForm = () => {
  const shortcode = useLocalStore((state) => state.shortcode);
  const username = useLocalStore((state) => state.username);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newRoomLink, setNewRoomLink] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
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

  const JoinRoomForm = (
    <form onSubmit={handleSubmit(onJoinSubmit)} className="flex flex-col gap-2">
      <p className="p-4 text-center font-light">Join an existing room</p>
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
  );

  const onCreateSubmit = async (data: { username: string }) => {
    if (errors.username) {
      return;
    }
    useLocalStore.setState({ username: data.username });

    setIsLoading(true);
    const newRoom = await supabase.from<Room>("room").insert({});
    const newShortcode = newRoom.data?.[0].shortcode.toUpperCase() ?? "";
    setIsLoading(false);

    useLocalStore.setState({ shortcode: newShortcode });
    setValue("shortcode", newShortcode);
    setNewRoomLink(
      new URL(`/rooms/${newShortcode}`, window.location.origin).href
    );
  };

  const CreateRoomForm = (
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
          <CtaButton type="submit" disabled={isLoading || !!newRoomLink}>
            Create
          </CtaButton>
        </div>
      </div>
      {newRoomLink && (
        <>
          <TextInput
            icon="link"
            value={newRoomLink}
            onClick={() => navigator.clipboard.writeText(newRoomLink)}
            readOnly
          />
          <CtaButton onClick={() => navigate(`/rooms/${shortcode}`)}>
            Go
          </CtaButton>
        </>
      )}
    </form>
  );

  return (
    <TabGroup
      tabs={[
        {
          label: "Join",
          element: JoinRoomForm,
        },
        {
          label: "Create",
          element: CreateRoomForm,
        },
      ]}
    />
  );
};
