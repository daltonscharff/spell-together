import { FC, useEffect } from "react";

type Props = {
  onLetter?: (key: string) => void;
  onBackspace?: () => void;
  onEnter?: () => void;
};

export const CaptureKeyboardEvents: FC<Props> = ({
  onLetter = (_) => {},
  onBackspace = () => {},
  onEnter = () => {},
}) => {
  useEffect(() => {
    const registerEvent = ({ key }: KeyboardEvent) => {
      if (/[a-zA-Z]/.test(key) && key.length === 1) {
        onLetter(key);
      } else if (key === "Backspace") {
        onBackspace();
      } else if (key === "Enter") {
        onEnter();
      }
    };
    window.addEventListener("keydown", registerEvent);
    return () => {
      window.removeEventListener("keydown", registerEvent);
    };
  }, [onLetter, onBackspace, onEnter]);

  return <></>;
};
