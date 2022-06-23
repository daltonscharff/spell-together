import { useState } from "react";

export const useUsername = () => {
  const [username, setUsernameState] = useState(
    localStorage.getItem("username")
  );

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setUsernameState(username);
  }

  return {
    username,
    setUsername,
  };
};
