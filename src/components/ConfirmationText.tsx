import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useRef } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { Description, Label } from '../styles/typography';
import { Input, Textarea } from './Input';

import { colors } from './../styles/theme'

export interface ConfirmationTextProps {
  label: string;
  description: string;
  inputStyles?: CSSProperties;
}
//jonathanng: Note that Description jsx is using props.label and 
//            Label is using props.description
//            If label and description change, this is will lead to
//            consequences here as the Description and Label do not
//            function as its name suggests.
function ConfirmationText(props: ConfirmationTextProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <Description style={{ marginBottom: props.description ? 7 : 0 }} as={'label'}>
          {props.label}
        </Description>
        {props.description && <Label>{props.description}</Label>}
      </div>
    </div>
  );
}

export { ConfirmationText };
