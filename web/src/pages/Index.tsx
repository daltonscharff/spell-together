import { Header } from "../components/Header";
import { HelpText } from "../components/HelpText";
import { JoinOrCreateRoomForm } from "../components/JoinOrCreateRoomForm";

export const Index = () => {
  return (
    <div className="container">
      <Header titleOnly />
      <div className="container flex gap-x-12 gap-y-6 flex-col-reverse md:flex-row mt-8">
        <div className="flex-grow w-full flex">
          <HelpText />
        </div>
        <div className="w-[1px] my-3 border-l hidden md:block" />
        <hr className="block md:hidden mx-3" />
        <div className="flex-grow w-full">
          <JoinOrCreateRoomForm />
        </div>
      </div>
    </div>
  );
};
