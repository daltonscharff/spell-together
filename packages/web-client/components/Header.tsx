import { FC, useState } from "react";

const Header: FC = () => {
  const [blinker, setBlinker] = useState("▁");
  return (
    <div className="font-NotoSans text-2xl font-bold my-3">
      <span>Spell Together</span>
      <span className="text-amber-400 opacity-50 ml-1">{blinker}</span>
    </div>
  );
};

export default Header;
