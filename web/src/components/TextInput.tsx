import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
  error?: string;
}

export const TextInput = ({ icon, error, ...props }: Props) => {
  return (
    <div className="w-full">
      <div
        className={`border rounded-sm flex flex-row w-full relative ${
          error && "border-red-700"
        }`}
      >
        <span className="h-4 w-4 absolute left-3 top-4">{icon}</span>
        <input
          className="pr-3 py-3 pl-9 w-full flex-grow"
          type="text"
          {...props}
        />
      </div>
      {error && (
        <div className="text-red-700 text-xs font-light px-3 pt-[2px] pb-1 w-full">
          {error}
        </div>
      )}
    </div>
  );
};
