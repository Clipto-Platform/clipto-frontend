import styled from "styled-components";

export const DropdownWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export const StyledSelect = styled.select`
  max-width: 220px;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-family: 'Scto Grotesk A';
    background: transparent;
    border: 1px solid #2A2A2A;
    box-sizing: border-box;
    border-radius: 8px;
    min-height: 48px;
    outline: none;
    padding-left: 16px;
    padding-right: 12px;
    min-width: 0;
    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;

    & > options {
      background-color:blue;
    }
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
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
    color: #FFFFFF;
`;
