import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

interface SlidesProps {
  translate: any;
}
export const Slides = styled.div<SlidesProps>`
  display: flex;
  flex-direction: row;
  height: clamp(500px, 88vw, 730px);
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
  display: flex;
  align-items: center;
  background-image: url(${(props) => props.background});
  background-position: ${(props) =>
    props.index == 0 ? 'center right' : props.index == 1 ? 'bottom right 30%' : 'center 10%'};
  background-size: cover;
  object-fit: cover;
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => `translate(${props.translate}%)`};
  overflow: hidden;
  transition: background-position 1s;
  ${(props) => props.theme.mediaWidth.upToMedium`
    background-position: ${(props) =>
      props.index == 0 ? '90%' : props.index == 1 ? 'center right 30%' : 'center 10%'};
  `}
`;
