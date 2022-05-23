import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { definitions } from "../types/supabase";
import { FoundWordList } from "./FoundWordList";

export type FoundWordDisplayProps = {
  foundWords?: definitions["word"][];
  totalWords?: number;
};

export const FoundWordDisplay = ({
  foundWords = [],
  totalWords = 0,
}: FoundWordDisplayProps) => {
  return (
    <Card>
      <Typography>
        found words: {foundWords.length}/{totalWords}
      </Typography>
      <FoundWordList foundWords={foundWords} />
    </Card>
  );
};
