import React from 'react';
import Icon from '../../assets/svgs/dropdown.svg';
import { DropdownWrapper, StyledSelect, StyledOption, StyledLabel, StyledSelectDiv } from './styles';

export function Dropdown(props: any) {
  return (
    <DropdownWrapper onChange={props.onChange}>
      <StyledLabel htmlFor="token">{props.formLabel}</StyledLabel>
      <StyledSelectDiv>
        <StyledSelect id="token" name="token">
          {props.children}
        </StyledSelect>
        <div>
          <img src={Icon} alt="icon" />
        </div>
      </StyledSelectDiv>
    </DropdownWrapper>
  );
}

export function Option(props: any) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
