import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const [state, setState] = useContext(UserContext);

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setState({ ...state, username });
  }

  function setShortcode(shortcode: string) {
    localStorage.setItem("shortcode", shortcode);
    setState({ ...state, shortcode });
  }

  // function validateShortcode() {
  //   // validate shortcode with API
  //   // throw error if not valid
  // }

  return {
    ...state,
    setUsername,
    setShortcode,
  };
};