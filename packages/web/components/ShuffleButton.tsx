import { FC, PropsWithChildren } from "react";

type Props = {
  onClick?: () => void;
};

const ShuffleButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full border flex justify-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        className="w-6"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke="black"
          strokeWidth="6"
          fill="white"
        />
        <line x1="0" y1="0" x2="100" y2="100" strokeWidth="20" stroke="white" />
        <polygon points="14,0 14,20 34,20" fill="black" />
        <polygon points="86,100 86,80 66,80" fill="black" />
      </svg>
    </button>
  );
};

export default ShuffleButton;
