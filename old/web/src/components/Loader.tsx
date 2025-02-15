export const Loader = () => {
  return (
    <div className="relative h-24 w-24 mx-auto my-16">
      <div className="absolute w-full h-full rounded-full border-8 border-zinc-200 opacity-40" />
      <div className="absolute w-full h-full rounded-full border-8 border-t-primary border-transparent animate-spin" />
    </div>
  );
};
