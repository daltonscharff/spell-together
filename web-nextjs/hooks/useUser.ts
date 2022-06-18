import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Router from "next/router";

export const useUser = ({ redirectTo = "" } = {}) => {
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (!redirectTo) return;

    if (!state.username || !state.shortcode) {
      Router.push(redirectTo);
    }
  }, [state, redirectTo]);

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setState({ ...state, username });
  }

  function setShortcode(shortcode: string) {
    localStorage.setItem("shortcode", shortcode);
    setState({ ...state, shortcode });
  }

  return {
    ...state,
    setUsername,
    setShortcode,
  };
};
