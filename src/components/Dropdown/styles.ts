import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export const StyledSelectDiv = styled.div`
  max-width: 220px;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #2a2a2a;
  box-sizing: border-box;
  border-radius: 8px;
  min-height: 48px;
  padding-left: 12px 16px;
  padding-right: 12px;
  min-width: 0;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;
export const StyledSelect = styled.select`
  background: transparent;
  height: 100%;
  font-family: 'Scto Grotesk A';
  outline: none;
  border: none;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  position: absolute;
  left: 0;
  padding: 10px;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? 'lightgrey' : 'black')};
  background-color: black;
`;

export const StyledLabel = styled.label`
  margin-bottom: 1rem;
  display: block;
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;
