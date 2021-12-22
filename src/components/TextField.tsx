import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';
import styled from 'styled-components';

import { Label } from '../styles/typography';
import { Input } from './Input';

export interface TextFieldProps {
  label: string;
}

const Description = styled.div`
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.lightGray};
`;

function TextField(props: AriaTextFieldOptions<'input'> & TextFieldProps) {
  const { label } = props;
  const ref = useRef<HTMLInputElement | null>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <Label as={'label'} {...labelProps}>
          {label}
        </Label>
        {props.description && <Description {...descriptionProps}>{props.description}</Description>}
      </div>
      <Input {...inputProps} ref={ref} />
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
