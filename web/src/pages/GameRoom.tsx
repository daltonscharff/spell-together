import { ButtonArea } from "../components/ButtonArea";
import { CorrectGuessList } from "../components/CorrectGuessList";
import { Footer } from "../components/Footer";
import { FoundWordDisplay } from "../components/FoundWordDisplay";
import { Header } from "../components/Header";
import { Hive } from "../components/Hive";
import { LetterInput } from "../components/LetterInput";
import { PointDisplay } from "../components/PointDisplay";

export const GameRoom = () => {
  return (
    <div className="flex flex-col gap-y-8 min-h-screen">
      <Header />
      <div className="container grid gap-8 grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="flex flex-col gap-8 mx-auto max-w-sm min-w-[200px]">
          <LetterInput />
          <Hive />
          <ButtonArea />
        </div>
        <div className="flex flex-col mx-auto max-w-lg min-w-[200px] border-black border rounded-sm md:max-h-[600px]">
          <div className="p-4 border-b-2 border-black">
            <PointDisplay />
          </div>
          <div className="p-4 border-b-2 border-black">
            <FoundWordDisplay />
          </div>
          <div className="p-2 overflow-y-auto">
            <CorrectGuessList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
