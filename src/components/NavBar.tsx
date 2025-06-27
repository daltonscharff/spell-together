import { Link } from "react-router";
import { APP_NAME } from "../copy";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/">
          <button className="btn bg-white text-black text-xl border-0 shadow-none">
            {APP_NAME}
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button>Link</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
