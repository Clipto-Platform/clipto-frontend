import styled, { keyframes } from 'styled-components';

interface SlidesProps {
  translate: any;
}
export const Slides = styled.div<SlidesProps>`
  display: flex;
  flex-direction: row;
  width: 300vw;
  transition: transform 1s;
  transform: ${(props) => `translateX(${props.translate}%)`};
`;

interface BackgroundWrapperProps {
  background: string;
  translate: any;
  index: number;
}
export const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => `translate(${props.translate}%)`};
`;
