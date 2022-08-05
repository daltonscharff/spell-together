import { usePuzzle } from "../hooks/usePuzzle";
import { useLocalStore } from "../hooks/useLocalStore";
import { useNavigate } from "react-router-dom";

type Props = {
  titleOnly?: boolean;
};

export const Header = ({ titleOnly }: Props) => {
  const { puzzle } = usePuzzle();
  const navigate = useNavigate();

  const username = useLocalStore((state) => state.username);
  return (
    <div className={"container mt-3 border-b border-black sm:pb-0"}>
      <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-x-4 gap-y-1 mb-2">
        <h1
          className="font-display text-2xl text-center md:text-left cursor-pointer inline"
          onClick={() => navigate("/")}
        >
          Spell Together
        </h1>
        {!titleOnly && (
          <>
            <div className="font-light text-center italic">
              {puzzle?.date &&
                new Date(puzzle?.date).toLocaleDateString(undefined, {
                  dateStyle: "full",
                })}
            </div>

            <div className="font-light text-center md:text-right ml-2">
              {username}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
