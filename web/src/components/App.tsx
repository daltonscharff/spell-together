import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading } = useShortcode();

  if (loading) return <div>loading</div>;

  if (!username || !shortcode || !isValid) {
    return (
      <div>
        <p>show sign in page</p>
        <p>show disabled game</p>
      </div>
    );
  }

  return (
    <h1 className="text-3xl font-bold underline">
      <p>show game</p>
    </h1>
  );
};

export default App;
