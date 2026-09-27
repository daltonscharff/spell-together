interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`ring ring-zinc-200 rounded-full px-5 py-2 cursor-pointer active:bg-zinc-200 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
