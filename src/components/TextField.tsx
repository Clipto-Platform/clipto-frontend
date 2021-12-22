import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { Description, Label } from '../styles/typography';
import { Input, Textarea } from './Input';

export interface TextFieldProps {
  label: string;
  inputStyles?: CSSProperties;
}

function TextField(props: AriaTextFieldOptions<'input' | 'textarea'> & TextFieldProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { ...textFieldProps } = props;
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(textFieldProps, ref);

  const inputStyles = { ...inputProps.style, ...props.inputStyles };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <Label style={{ marginBottom: props.description ? 7 : 0 }} as={'label'} {...labelProps}>
          {props.label}
        </Label>
        {props.description && <Description {...descriptionProps}>{props.description}</Description>}
      </div>
      {props.inputElementType === 'textarea' ? (
        <Textarea {...(inputProps as any)} style={inputStyles} />
      ) : (
        <Input {...(inputProps as any)} ref={ref} style={inputStyles} />
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export { TextField };
