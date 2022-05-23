import { definitions } from "../types/supabase";

type FoundWordListProps = {
  foundWords?: definitions["word"][];
};

export const FoundWordList = ({}: FoundWordListProps) => {
  return <>found word list</>;
};
