import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';

export interface TextFieldProps {
  label: string;
}

function TextField(props: AriaTextFieldOptions<'input'> & TextFieldProps) {
  const { label } = props;
  const ref = useRef<HTMLInputElement | null>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

// <TextField label="Email" placeholder="abc@example.com" />;

export { TextField };
