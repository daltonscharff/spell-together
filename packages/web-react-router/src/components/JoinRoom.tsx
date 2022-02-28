import { useState } from "react";
import { useStore } from "../store";

export function JoinRoom() {
  const [username, setUsername] = useState<string>(
    useStore((state) => state.username)
  );
  const [shortcode, setShortcode] = useState<string>(
    useStore((state) => state.shortcode)
  );
  const setGlobalUsername = useStore((state) => state.setUsername);
  const setGlobalShortcode = useStore((state) => state.setShortcode);
  const onSubmit = () => {
    setGlobalUsername(username);
    setGlobalShortcode(shortcode);
  };
  return (
    <div>
      <input type="text" value={username} />
      <input type="text" value={shortcode} />
      <button>Submit</button>
    </div>
  );
}
