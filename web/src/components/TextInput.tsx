type Props = {
  icon: string;
  placeholder: string;
  solid?: boolean;
};

export const TextInput = ({ icon, solid, placeholder }: Props) => {
  return (
    <div className="border rounded-sm flex flex-row w-full relative">
      <span className="py-3 absolute left-3">
        <i className={`bx ${solid ? "bxs" : "bx"}-${icon}`} />
      </span>
      <input
        className="pr-3 py-3 pl-9 w-full flex-grow"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
