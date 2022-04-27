import styled, { keyframes } from 'styled-components';

interface SlidesProps {
  translate: any;
}
export const SlidesDesktop = styled.div<SlidesProps>`
  display: flex;
  flex-direction: row;
  width: 300vw;
  transition: transform 1s;
  transform: ${(props) => `translateX(${props.translate}%)`};
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const SlidesMobile = styled.div<SlidesProps>`
  display: flex;
  flex-direction: row;
  width: 300vw;
  transition: transform 1s;
  transform: ${(props) => `translateX(${props.translate}%)`};
  @media screen and (min-width: 601px) {
    display: none;
  }
`;
interface BackgroundWrapperProps {
  background: string;
  translate: any;
  index: number;
}
export const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  background-image: url(${(props) => props.background});
  background-position: ${(props) =>
    props.index == 0 ? 'center right 15%' : props.index == 1 ? 'center right 30%' : 'center'};
  background-size: cover;
  object-fit: cover;
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => `translate(${props.translate}%)`};
  overflow: hidden;
  @media screen and (max-width: 601px) {
    background-position: center center;
  }
`;
