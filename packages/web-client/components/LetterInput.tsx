import { FC, RefObject, useRef, useState } from "react";

type Props = {
  value: string;
  validLetters: string[];
  centerLetter: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
};

type LetterCategory = "valid" | "invalid" | "center";

function checkLetterCategory(
  letter: string,
  letters: string[],
  centerLetter: string
): LetterCategory {
  letter = letter.toLowerCase();
  if (letter === centerLetter) return "center";
  if (letters.map((letter) => letter.toLowerCase()).includes(letter))
    return "valid";
  return "invalid";
}

const LetterInput: FC<Props> = ({
  value,
  validLetters,
  centerLetter,
  inputRef,
  onChange,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <>
      <div className="font-black text-3xl text-center py-3 flex flex-wrap justify-center">
        {value.split("").map((letter, i) => {
          const category = checkLetterCategory(
            letter,
            validLetters,
            centerLetter
          );
          let color = "";
          switch (category) {
            case "center":
              color = "text-yellow-300";
              break;
            case "valid":
              color = "text-black";
              break;
            default:
              color = "text-zinc-300";
          }
          return (
            <span key={i} className={`${color}`}>
              {letter}
            </span>
          );
        })}
        {inputFocus && (
          <div className="animate-blink mx-[2px] h-9 w-[2px] bg-yellow-300" />
        )}
      </div>
      <input
        type="text"
        className="focus:outline-none h-0"
        placeholder={"Type..."}
        value={value}
        maxLength={20}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => !inputFocus && setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        ref={inputRef}
      />
    </>
  );
};

export default LetterInput;
