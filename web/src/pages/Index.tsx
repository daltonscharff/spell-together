import { CtaButton } from "../components/CtaButton";
import { HelpText } from "../components/HelpText";
import { TabGroup } from "../components/TabGroup";
import { TextInput } from "../components/TextInput";

export const Index = () => {
  return (
    <div className="flex gap-12">
      <div className="flex-grow w-full flex">
        <HelpText />
      </div>
      <div className="w-[1px] my-3 border-l" />
      <div className="flex-grow w-full">
        <TabGroup
          tabs={[
            {
              label: "Join",
              element: (
                <form className="flex flex-col gap-2">
                  <p className="p-4 text-center font-light">
                    Join an existing room
                  </p>
                  <TextInput icon="user" placeholder="Your name" solid />
                  <div className="flex gap-2">
                    <TextInput icon="hash" placeholder="Room code" />
                    <CtaButton>Go</CtaButton>
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
