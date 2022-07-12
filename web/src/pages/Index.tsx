import { Header } from "../components/Header";
import { JoinRoomForm } from "../components/JoinRoomForm";

export const Index = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Header />
      <div className="container grid grid-cols-1 sm:grid-cols-2 flex-grow text-center gap-4">
        <div className="p-4 flex flex-col items-center">
          <div className="w-full max-w-xs">
            <h1 className="font-light uppercase mb-6">Join Room</h1>
            <JoinRoomForm />
          </div>
        </div>
        <div className="p-4 flex flex-col items-center">
          <h1 className="font-light uppercase">Create Room</h1>
        </div>
      </div>
    </div>
  );
};
