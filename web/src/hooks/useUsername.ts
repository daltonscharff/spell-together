import { useContext } from "react";
import { UsernameContext } from "../contexts/UsernameContext";

export const useUsername = () => {
  const [username, setUsernameState] = useContext(UsernameContext);

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setUsernameState(username);
  }

  return {
    username,
    setUsername,
  };
};
