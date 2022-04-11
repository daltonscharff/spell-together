import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/rooms/join")}>Join</button>
      <button onClick={() => navigate("/rooms/create")}>Create</button>
    </>
  );
}
