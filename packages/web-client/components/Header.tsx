import { FC } from "react";

type Props = {
  date: string;
  username?: string;
};

const Header: FC<Props> = ({ date, username }) => {
  return (
    <header className="pb-4 border-b">
      <div className="font-RobotoSlab text-3xl text-left mb-3">
        Spell Together
      </div>
      <div className="flex justify-between gap-4 font-light">
        <div>{date}</div>
        {username && <div>{username}</div>}
      </div>
    </header>
  );
};

export default Header;
