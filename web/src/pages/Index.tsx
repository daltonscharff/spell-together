import { CtaButton } from "../components/CtaButton";
import { HelpText } from "../components/HelpText";
import { TabGroup } from "../components/TabGroup";
import { TextInput } from "../components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "../hooks/useLocalStore";

export const Index = () => {
  const shortcode = useLocalStore((state) => state.shortcode);
  const username = useLocalStore((state) => state.username);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username ?? "",
      shortcode: shortcode ?? "",
    },
  });

  const onSubmit = (data: { username: string; shortcode: string }) => {
    console.log("submitted", data);
    if (Object.entries(errors).length !== 0) {
      return;
    }
    useLocalStore.setState({ username: data.username });
    useLocalStore.setState({ shortcode: data.shortcode });
  };

  return (
    <div className="flex gap-x-12 gap-y-6 flex-col-reverse md:flex-row">
      <div className="flex-grow w-full flex">
        <HelpText />
      </div>
      <div className="w-[1px] my-3 border-l hidden md:block" />
      <hr className="block md:hidden mx-3" />
      <div className="flex-grow w-full">
        <TabGroup
          tabs={[
            {
              label: "Join",
              element: (
                <form
                  onSubmit={handleSubmit(onSubmit)}
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
                          message:
                            "Please provide a valid, 6 character room code",
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
                      <CtaButton type="submit">Go</CtaButton>
                    </div>
                  </div>
                </form>
              ),
            },
            {
              label: "Create",
              element: <div>Create</div>,
            },
          ]}
        />
      </div>
    </div>
  );
};
