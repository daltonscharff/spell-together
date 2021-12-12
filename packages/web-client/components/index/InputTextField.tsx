import { Controller, Control } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: Control<any, object>;
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
    // @ts-ignore
    render={({ field: { onChange, value }, fieldState: { invalid } }) => (
      <input type="text" value={value} onChange={onChange} />
    )}
    rules={rules}
  />
);

export default InputTextField;
