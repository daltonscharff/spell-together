import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { LoginModal } from "./LoginModal";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading, unsetShortcode } = useShortcode();

  if (loading) return <div>loading</div>;

  if (!username || !shortcode || !isValid) {
    return (
      <div>
        <LoginModal />
        <p>show sign in page</p>
        <p>show disabled game</p>
      </div>
    );
  }

  return (
    <h1 className="text-3xl font-bold underline">
      <p>show game</p>
      <button className="border" onClick={unsetShortcode}>
        change room
      </button>
    </h1>
  );
};

export default App;