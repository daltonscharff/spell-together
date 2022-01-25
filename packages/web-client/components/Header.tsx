import { FC } from "react";
import dayjs from "dayjs";

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
        <div>{dayjs(date).format("MMMM D, YYYY")}</div>
        {username && <div>{username}</div>}
      </div>
    </header>
  );
};

export default Header;
