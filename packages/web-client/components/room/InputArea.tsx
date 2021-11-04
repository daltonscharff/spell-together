import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
  onTextInput?: () => void;
  onSubmit?: () => void;
  onJumble: () => void;
}

const InputArea: React.FC<Props> = ({ onTextInput, onSubmit, onJumble }) => {
  return (
    <>
      <TextField />
      <Button>Submit</Button>
      <Button onClick={onJumble}>Jumble</Button>
    </>
  );
};

export default InputArea;
