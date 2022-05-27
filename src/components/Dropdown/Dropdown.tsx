import React from 'react';
import Icon from '../../assets/svgs/dropdown.svg';
import { DropdownWrapper, StyledSelect, StyledOption, StyledLabel, StyledSelectDiv } from './styles';

export function Dropdown(props: {
  children: Array<JSX.Element>;
  name: string;
  onChange: (e: any) => void;
  formLabel: string;
}) {
  return (
    <DropdownWrapper onChange={props.onChange} defaultValue={'sdf'}>
      <StyledLabel htmlFor={props.name}>{props.formLabel}</StyledLabel>
      <StyledSelectDiv>
        <StyledSelect id={props.name} name={props.name}>
          {props.children}
        </StyledSelect>
        <div>
          {props.children.length != 1 && <img src={Icon} alt="icon" />}
        </div>
      </StyledSelectDiv>
    </DropdownWrapper>
  );
}

export function Option(props: any) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
