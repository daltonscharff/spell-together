import { useParams } from "react-router-dom";
import { useStore } from "../store";

export function Room() {
  let params = useParams();
  const setShortcode = useStore((state) => state.setShortcode);
  if (params.shortcode) setShortcode(params.shortcode);
  const shortcode = useStore((state) => state.shortcode);

  return <>Room {shortcode}</>;
}
