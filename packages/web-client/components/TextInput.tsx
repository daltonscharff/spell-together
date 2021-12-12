import { FC } from "react";

type Props = {
  placeholder?: string;
};

const TextInput: FC<Props> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full py-3 bg-zinc-50 rounded pl-8 pr-2"
    />
  );
};

export default TextInput;
