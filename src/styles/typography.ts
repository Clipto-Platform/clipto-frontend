import styled from 'styled-components';

const Text = styled.span`
  display: block;
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  color: ${(props) => props.theme.lightGray};
`;

const Label = styled.span`
  display: block;
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.white};
`;

export { Label, Text };
