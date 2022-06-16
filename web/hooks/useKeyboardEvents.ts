import { useEffect } from "react";

export const useKeyboardEvents = ({
  onLetter = (_) => {},
  onBackspace = () => {},
  onEnter = () => {},
  disabled = false,
}) => {
  useEffect(() => {
    if (disabled) return;
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
  }, [onLetter, onBackspace, onEnter, disabled]);
};
