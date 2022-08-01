type Props = {
  icon: string;
  placeholder: string;
  solid?: boolean;
  error?: string;
};

export const TextInput = ({ icon, solid, placeholder, error }: Props) => {
  return (
    <div className="w-full">
      <div
        className={`border rounded-sm flex flex-row w-full relative ${
          error && "border-red-700"
        }`}
      >
        <span className="py-3 absolute left-3">
          <i className={`bx ${solid ? "bxs" : "bx"}-${icon}`} />
        </span>
        <input
          className="pr-3 py-3 pl-9 w-full flex-grow"
          type="text"
          placeholder={placeholder}
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
