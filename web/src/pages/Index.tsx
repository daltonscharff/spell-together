import { CtaButton } from "../components/CtaButton";
import { HelpText } from "../components/HelpText";
import { TabGroup } from "../components/TabGroup";
import { TextInput } from "../components/TextInput";

export const Index = () => {
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
                <form className="flex flex-col gap-2">
                  <p className="p-4 text-center font-light">
                    Join an existing room
                  </p>
                  <TextInput icon="user" placeholder="Your name" solid />
                  <div className="flex gap-2">
                    <TextInput
                      icon="hash"
                      placeholder="Room code"
                      error="Test error"
                    />
                    <div>
                      <CtaButton>Go</CtaButton>
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
