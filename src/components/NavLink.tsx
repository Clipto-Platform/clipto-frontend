import { Link } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";

const StyledSpan = styled.span`
  display: block;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;
  transition: color 0.15s ease;
  :hover {
    color: #ffffff;
  }
`;
export const NavLink = (props: { to: string, name: string, style: CSSProperties, pathname: string }) => {
  return (
    <>
      {props.to === props.pathname && (<Link to={props.to}>
        <StyledSpan style={{ ...props.style, color: '#ffffff' }}>{props.name}</StyledSpan>
      </Link>)}
      {props.to !== props.pathname && (<Link to={props.to}>
        <StyledSpan style={{ ...props.style }}>{props.name}</StyledSpan>
      </Link>)}
    </>
  )
}