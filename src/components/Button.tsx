import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';

interface ButtonProps {
  elementType?: 'button' | 'div';
  isDisabled?: boolean;
  key?: string;
  style?: CSSProperties;
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'small';
  width?: 'small' | 'large';
  link?: {
    to: string;
    state: object;
  };
}
const ButtonLink = styled(Link)<{
  isPressed: boolean;
  isDisabled?: boolean;
  variant: 'primary' | 'secondary';
  size: 'large' | 'small';
  width?: 'small' | 'large';
}>`
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: bold;

  padding: 0 20px;
  font-size: ${(props) => {
    if (props.size === 'small') {
      return '14px';
    }
    return '16px';
  }};
  line-height: ${(props) => {
    if (props.size === 'small') {
      return '17px';
    }
    return '20px';
  }};
  line-height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  border-radius: ${(props) => {
    if (props.size === 'small') {
      return '40px';
    }
    return '50px';
  }};
  height: ${(props) => {
    if (props.size === 'small') {
      return '40px';
    }
    return '48px';
  }};
  width: 100%;
  max-width: ${(props) => {
    console.log(props.width);
    if (props.width === 'small') {
      return '160px';
    }
    return '100%';
  }};

  transition: all 0.15s ease;
  will-change: transform, background-color, box-shadow;
  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};

  background: ${(props) => {
    if (props.variant === 'secondary') {
      return props.theme.blackPure;
    }
    return props.theme.yellow;
  }};
  color: ${(props) => {
    if (props.variant === 'secondary') {
      return props.theme.white;
    }
    return props.theme.blackPure;
  }};
  border: ${(props) => {
    if (props.variant === 'secondary') {
      return `1px solid ${props.theme.border}`;
    }
    return 'none';
  }};
  :hover,
  :active {
    border: ${(props) => {
      if (props.variant === 'secondary') {
        return `1px solid ${props.theme.yellow}`;
      }
      return 'none';
    }};
  }
  ${(props) =>
    props.isDisabled &&
    `
  color: ${props.theme.blackPure};
  cursor: not-allowed;
  background: ${props.theme.gray};
`}
`;
const StyledButton = styled.button<{
  isPressed: boolean;
  isDisabled?: boolean;
  variant: 'primary' | 'secondary';
  size: 'large' | 'small';
  width?: 'small' | 'large';
}>`
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: bold;

  padding: 0 20px;
  font-size: ${(props) => {
    if (props.size === 'small') {
      return '14px';
    }
    return '16px';
  }};
  line-height: ${(props) => {
    if (props.size === 'small') {
      return '17px';
    }
    return '20px';
  }};
  line-height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  border-radius: ${(props) => {
    if (props.size === 'small') {
      return '40px';
    }
    return '50px';
  }};
  height: ${(props) => {
    if (props.size === 'small') {
      return '40px';
    }
    return '48px';
  }};
  width: 100%;
  max-width: ${(props) => {
    console.log(props.width);
    if (props.width === 'small') {
      return '160px';
    }
    return '100%';
  }};

  transition: all 0.15s ease;
  will-change: transform, background-color, box-shadow;
  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};

  background: ${(props) => {
    if (props.variant === 'secondary') {
      return props.theme.blackPure;
    }
    return props.theme.yellow;
  }};
  color: ${(props) => {
    if (props.variant === 'secondary') {
      return props.theme.white;
    }
    return props.theme.blackPure;
  }};
  border: ${(props) => {
    if (props.variant === 'secondary') {
      return `1px solid ${props.theme.border}`;
    }
    return 'none';
  }};
  :hover,
  :active {
    border: ${(props) => {
      if (props.variant === 'secondary') {
        return `1px solid ${props.theme.yellow}`;
      }
      return 'none';
    }};
  }
  ${(props) =>
    props.disabled &&
    `
    color: ${props.theme.blackPure};
    cursor: not-allowed;
    background: ${props.theme.gray};
  `}
`;

const PrimaryButton: React.FC<ButtonProps & AriaButtonProps<'button'>> = (props) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <>
      {props.link?.to ? (
        <ButtonLink
          to={props.link.to}
          state={props.link.state}
          key={props.key}
          variant={props.variant ?? 'primary'}
          size={props.size ?? 'large'}
          isDisabled={props.isDisabled}
          {...buttonProps}
          isPressed={isPressed}
          style={props.style}
          width={props.width ?? 'large'}
        >
          {props.children}
        </ButtonLink>
      ) : (
        <StyledButton
          key={props.key}
          variant={props.variant ?? 'primary'}
          size={props.size ?? 'large'}
          isDisabled={props.isDisabled}
          {...buttonProps}
          isPressed={isPressed}
          ref={ref}
          style={props.style}
          width={props.width ?? 'large'}
        >
          {props.children}
        </StyledButton>
      )}
    </>
  );
};

export { PrimaryButton };
