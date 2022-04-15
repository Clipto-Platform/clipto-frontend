import styled, { keyframes } from 'styled-components';
import background1 from '../../assets/images/homepage/page1/background.png';
import background2 from '../../assets/images/homepage/page2/background.png';
import background3 from '../../assets/images/homepage/page3/background.png';

const fade = keyframes`
  from {
    opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
  to {
      opacity: 100%;
  }
`;
export const Slides = styled.div`
  display: flex;
  flexdirection: row;
  flexwrap: nowrap;
  width: 300vw;
  transition: transform 1s;
  transform: ${(props) => `translateX(${props.translate}vw)`};
`;
export const BackgroundWrapper = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-color: black;
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => `translateX(${props.translate}vw)`};
`;
