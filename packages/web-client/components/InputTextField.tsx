import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface Props {
  name: string;
  label: string;
  control: Control;
  helperText?: string;
  rules?: any;
}

const InputTextField: React.FC<Props> = ({
  name,
  label,
  control,
  helperText,
  rules,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { invalid } }) => (
      <TextField
        label={label}
        variant="outlined"
        margin="normal"
        value={value}
        onChange={onChange}
        error={invalid}
        helperText={helperText}
        fullWidth
      />
    )}
    rules={rules}
  />
);

export default InputTextField;
