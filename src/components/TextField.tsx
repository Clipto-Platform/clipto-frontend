import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Loader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'styled-components';

import { Description, Label } from '../styles/typography';
import { EndText, Input, Textarea } from './Input';
import { colors } from '@/styles/theme';
export interface TextFieldProps {
  label?: string;
  endText?: string;
  inputStyles?: CSSProperties;
  isSuccess?: boolean;
  isLoader?: boolean;
}

const iconStyle = {
  color: 'green',
  margin: 'auto 0 auto -36px',
};

function TextField(props: AriaTextFieldOptions<'input' | 'textarea'> & TextFieldProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { ...textFieldProps } = props;
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(textFieldProps, ref);
  const { isDisabled } = props;
  const inputStyles = { ...inputProps.style, ...props.inputStyles };

  const inputStylesWithState = props.errorMessage
    ? { ...inputStyles, borderColor: 'red' }
    : isDisabled === true
    ? { ...inputStyles, backgroundColor: colors.darkGray, color: colors.lightGray }
    : { ...inputStyles };

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
          <Textarea {...(inputProps as any)} style={inputStylesWithState} />
        ) : (
          <>
            <Input
              {...(inputProps as any)}
              min="0"
              step="1"
              onWheel={(e) => (e.target as HTMLElement).blur()}
              ref={ref}
              style={inputStylesWithState}
            />
            {props.isSuccess ? <BsFillCheckCircleFill size={24} style={iconStyle} /> : null}
            {props.isLoader ? (
              <div style={iconStyle}>
                <Loader color="#fff" size={20} />
              </div>
            ) : null}
          </>
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
