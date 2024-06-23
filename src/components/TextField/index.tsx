import { Input } from "./TextField.styles";
import { TextFieldProps } from "./TextField.types";

const TextField = (props: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input {...props} />
      <span style={{ fontSize: 12, color: 'red' }}>{props.error}</span>
    </div>
  );
};

export default TextField;
