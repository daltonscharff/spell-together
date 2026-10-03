import { useState } from "react";
import Image from "next/image";
import { Button } from ".";
import ShuffleIcon from "@/public/icons/shuffle.svg";

type ShuffleButtonProps = {
  onClick?: () => void;
};
export function ShuffleButton({ onClick }: ShuffleButtonProps) {
  const [rotation, setRotation] = useState(0);
  return (
    <Button
      className="px-2! flex-shrink-0"
      onClick={() => {
        setRotation((prev) => prev - 180);
        onClick?.();
      }}
      aria-label="Shuffle"
      type="button"
    >
      <Image
        src={ShuffleIcon}
        alt="shuffle"
        className="w-6 transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </Button>
  );
}
