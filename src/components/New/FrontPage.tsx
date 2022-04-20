import styled, { keyframes } from 'styled-components';
import background1 from '../../assets/images/homepage/page1/background.png';
import background2 from '../../assets/images/homepage/page2/background.png';
import background3 from '../../assets/images/homepage/page3/background.png';

export const Slides = styled.div`
  width: 300vw;
  transition: transform 1s;
  transform: ${(props) => `translateX(${props.translate}vw)`};
`;
export const BackgroundWrapper = styled.div`
  display: inline-block;
  background-image: url(${(props) => props.background});
  background-size: cover;
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => `translateX(${props.translate}vw)`};
  overflow: hidden;
`;
