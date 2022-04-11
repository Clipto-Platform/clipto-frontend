import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
} from "./styles";

export function Dropdown(props:any) {
  return (
    <DropdownWrapper 
    onChange={props.onChange}>
      <StyledLabel htmlFor="token">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="token" name="token">
        {props.children}
      </StyledSelect>
    </DropdownWrapper>
  );
}

export function Option(props:any) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}