import { Input } from "./TextField.styles";
import { TextFieldProps } from "./TextField.types";
import { forwardRef } from "react";

const TextField = forwardRef((props: TextFieldProps, ref) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input {...props} ref={ref} />
      <span style={{ fontSize: 12, color: 'red' }}>{props.error}</span>
    </div>
  );
});

export default TextField;
