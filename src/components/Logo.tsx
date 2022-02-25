import styled, { CSSProperties } from 'styled-components';
import clipto from '../assets/images/pfps/CliptoLogo.png';
const LogoText = styled.div`
  font-family: 'Scto Grotesk A';
  font-style: bold;
  font-weight: 900;
  font-size: 24px;
  line-height: 125%;

  display: flex;
  align-items: center;
  padding: 4px;
  margin-left: -4px;
  color: #ffffff;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogoProps {
  style?: CSSProperties;
}

const Logo: React.FC<LogoProps> = (props) => {
  return <LogoText {...props}>CLIPTO</LogoText>;
};

export { Logo };
