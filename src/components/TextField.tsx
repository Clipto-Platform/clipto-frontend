import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { Description, Label } from '../styles/typography';
import { EndText, Input, Textarea } from './Input';

export interface TextFieldProps {
  label?: string;
  endText?: string;
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
        {props.label && (
          <Label style={{ marginBottom: props.description ? 7 : 0 }} as={'label'} {...labelProps}>
            {props.label}
          </Label>
        )}
        {props.description && <Description {...descriptionProps}>{props.description}</Description>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {props.inputElementType === 'textarea' ? (
          <Textarea {...(inputProps as any)} style={props.errorMessage ? { ...inputStyles, borderColor: 'red' } : { ...inputStyles }} />
        ) : (
          <Input {...(inputProps as any)} min="0" step="1" ref={ref} style={props.errorMessage ? { ...inputStyles, borderColor: 'red' } : { ...inputStyles }} />
        )}
        {props.endText && (
          <div style={{ position: 'relative' }}>
            <EndText>{props.endText}</EndText>
          </div>
        )}
      </div>
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12, paddingTop: 5 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export { TextField };
