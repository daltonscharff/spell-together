import { useParams } from "react-router-dom";

export function Room() {
  let { shortcode } = useParams();
  return <>Room {shortcode}</>;
}
