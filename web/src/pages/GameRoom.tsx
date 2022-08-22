import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonArea } from "../components/ButtonArea";
import { CorrectGuessList } from "../components/CorrectGuessList";
import { FoundWordDisplay } from "../components/FoundWordDisplay";
import { GuessNotification } from "../components/GuessNotification";
import { Header } from "../components/Header";
import { HelpText } from "../components/HelpText";
import { Hive } from "../components/Hive";
import { LetterInput } from "../components/LetterInput";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { PointDisplay } from "../components/PointDisplay";
import { useHelpModal } from "../hooks/useHelpModal";
import { useLocalStore } from "../hooks/useLocalStore";
import { usePuzzle } from "../hooks/usePuzzle";
import { useRoom } from "../hooks/useRoom";
import { validateShortcode } from "../utils/validateShortcode";

export const GameRoom = () => {
  const { shortcode } = useParams();
  const [searchParams] = useSearchParams();
  const username = useLocalStore((state) => state.username);
  const expandedIndex = useLocalStore((state) => state.expandedIndex);
  const navigate = useNavigate();
  const { isLoading: isRoomLoading } = useRoom();
  const { isLoading: isPuzzleLoading } = usePuzzle();
  const showHelpModal = useHelpModal((state) => state.showHelpModal);

  useEffect(() => {
    const usernameParam = searchParams.get("username");
    if (usernameParam) {
      useLocalStore.setState({ username: usernameParam });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!shortcode) return;
    validateShortcode(shortcode).then((isValid) => {
      if (isValid) {
        useLocalStore.setState({ shortcode });
      }
      if (!isValid || !username) {
        navigate("/");
      }
    });
  }, [shortcode, username, navigate]);

  if (isPuzzleLoading || isRoomLoading) {
    return (
      <div className="container">
        <Header />
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Modal
        open={showHelpModal}
        onClose={() => useHelpModal.setState({ showHelpModal: false })}
      >
        <HelpText />
      </Modal>
      <div className="container">
        <Header />
        <div className="my-1">
          <GuessNotification />
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 flex-grow">
          <div className="flex flex-col gap-8 mx-auto max-w-sm min-w-[200px] w-full">
            <LetterInput disabled={showHelpModal === true} />
            <Hive />
            <ButtonArea />
          </div>
          <div className="flex flex-col mx-auto max-w-lg min-w-[200px] w-full border-black border rounded-sm md:max-h-[600px]">
            <div
              className={`p-4 border-b-2 border-black ${
                expandedIndex !== 0 && "cursor-pointer hover:bg-zinc-100"
              }`}
              onClick={() => useLocalStore.setState({ expandedIndex: 0 })}
            >
              <PointDisplay expanded={expandedIndex === 0} />
            </div>
            <div
              className={`p-4 border-b-2 border-black ${
                expandedIndex !== 1 && "cursor-pointer hover:bg-zinc-100"
              }`}
              onClick={() => useLocalStore.setState({ expandedIndex: 1 })}
            >
              <FoundWordDisplay expanded={expandedIndex === 1} />
            </div>
            <div className="p-2 overflow-y-auto">
              <CorrectGuessList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
