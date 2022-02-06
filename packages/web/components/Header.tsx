import { FC } from "react";
import dayjs from "dayjs";

type Props = {
  date: string;
  username?: string;
};

const Header: FC<Props> = ({ date, username }) => {
  return (
    <header className="border-b border-zinc-300">
      <div className="max-w-screen-lg mx-auto flex flex-row items-end py-4 px-3">
        <div className="flex flex-col sm:gap-4 sm:flex-row pr-4 flex-grow sm:items-end">
          <div className="font-RobotoSlab text-3xl">Spell Together</div>
          <div className="font-light text-xl">
            {dayjs(date).format("MMMM D, YYYY")}
          </div>
        </div>
        {username && <div className="font-light">{username}</div>}
      </div>
    </header>
  );
};

export default Header;
