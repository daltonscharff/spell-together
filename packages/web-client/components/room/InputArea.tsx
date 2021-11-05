import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent } from "react";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onTextInput?: () => void;
  onSubmit?: () => void;
  onJumble: () => void;
  handleInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputArea: React.FC<Props> = ({ input, handleInput, onJumble }) => {
  return (
    <>
      <TextField value={input} onChange={(event) => handleInput(event)} />
      <Button>Submit</Button>
      <Button onClick={onJumble}>Jumble</Button>
    </>
  );
};

export default InputArea;
