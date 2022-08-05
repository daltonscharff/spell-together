import { useNotifications } from "../hooks/useNotifications";

export const GuessNotification = () => {
  const guess = useNotifications((state) => state.guessResponse);

  return (
    <div
      className={`h-6 rounded-b-sm text-center ${
        guess?.correct === false && "bg-red-50 text-red-900"
      } ${guess?.correct === true && "bg-green-50 text-green-900"}`}
    >
      <span className="font-bold uppercase">{guess?.word}</span>

      {guess?.message && <span> - {guess.message}</span>}
    </div>
  );
};
