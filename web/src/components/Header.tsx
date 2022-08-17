import { useNavigate } from "react-router-dom";
import { useHelpModal } from "../hooks/useHelpModal";

type Props = {
  titleOnly?: boolean;
};

export const Header = ({ titleOnly }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={"container mt-2 border-b border-black sm:pb-0"}>
      <div className="grid grid-cols-3 items-baseline gap-x-4 gap-y-1 mb-2">
        <div className="col-span-2">
          <h1
            className="font-display text-2xl text-left cursor-pointer inline"
            onClick={() => navigate("/")}
          >
            Spell Together
          </h1>
        </div>
        {!titleOnly && (
          <div className="text-right text-lg">
            <div
              className="cursor-pointer"
              onClick={() => {
                useHelpModal.setState({ showHelpModal: true });
              }}
            >
              <i className={`bx bx-help-circle `} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
