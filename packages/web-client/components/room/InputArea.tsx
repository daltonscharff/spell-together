import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent } from "react";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: () => void;
  onJumble: () => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputArea: React.FC<Props> = ({ input, onChange, onJumble }) => {
  return (
    <>
      <TextField value={input} onChange={(event) => onChange(event)} />
      <Button>Submit</Button>
      <Button onClick={onJumble}>Jumble</Button>
    </>
  );
};

export default InputArea;
