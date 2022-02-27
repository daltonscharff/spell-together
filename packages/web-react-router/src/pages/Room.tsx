import { useParams } from "react-router-dom";

export default function Room() {
  let { shortcode } = useParams();
  return <>Room {shortcode}</>;
}
