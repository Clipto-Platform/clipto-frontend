import styled from 'styled-components';

const Input = styled.input`
  font-family: 'Scto Grotesk A';
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
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
`;

const Textarea = styled.textarea`
  border: none;
  overflow: auto;
  outline: none;
  box-shadow: none;
  resize: none; /*remove the resize handle on the bottom right*/
  font-family: 'Scto Grotesk A';
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
  box-sizing: border-box;
  border-radius: 8px;
  min-height: 48px;
  outline: none;
  padding-left: 16px;
  padding-right: 12px;
  padding-top: 16px;
  padding-bottom: 8px;
  min-width: 0;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  min-height: 182px;
`;

const EndText = styled.p`
  position: absolute;
  right: 0;
  padding-right: 18px;
  margin-left: 100%;
  transform: translateY(14px);
  font-weight: bold;
`;

export { EndText, Input, Textarea };
