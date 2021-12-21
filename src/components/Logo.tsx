import styled, { CSSProperties } from 'styled-components';

const LogoText = styled.div`
  font-family: 'Scto Grotesk A';
  font-style: bold;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  /* identical to box height */

  display: flex;
  align-items: center;

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
