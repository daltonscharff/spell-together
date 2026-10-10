interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`ring ring-zinc-300 rounded-full px-6 py-3 cursor-pointer active:bg-zinc-300 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
