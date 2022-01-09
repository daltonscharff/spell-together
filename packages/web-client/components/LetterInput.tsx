import { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const LetterInput: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full py-3 bg-zinc-50 rounded pl-8 pr-2"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default LetterInput;
