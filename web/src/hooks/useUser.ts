import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const useUser = ({ redirectTo = "" } = {}) => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirectTo) return;

    if (!state.username || !state.shortcode) {
      // Router.push(redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [state, redirectTo, navigate]);

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
