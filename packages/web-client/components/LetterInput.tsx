import { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const LetterInput: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full font-black text-3xl text-center py-3 mb-4 rounded focus:outline-none"
      placeholder={'"..."'}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default LetterInput;
