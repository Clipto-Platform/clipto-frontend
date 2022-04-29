import styled, { keyframes } from 'styled-components';
import background1D from '../../assets/images/homepage/page1/background1D.png';
import background2D from '../../assets/images/homepage/page2/background2D.png';
import background3D from '../../assets/images/homepage/page3/background3D.png';
import background1M from '../../assets/images/homepage/page1/background1M.png';
import background2M from '../../assets/images/homepage/page2/background2M.png';
import background3M from '../../assets/images/homepage/page3/background3M.png';

const backgroundD = [background1D, background2D, background3D];
const backgroundM = [background1M, background2M, background3M];
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
  translate: any;
  index: number;
}
export const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  background-image: url(${(props) => backgroundD[props.index]});
  background-position: ${(props) =>
    props.index == 0 ? 'center right' : props.index == 1 ? 'center right 30%' : 'center'};
  background-size: cover;
  object-fit: cover;
  width: 100vw;
  height: 100%;
  opacity: 100%;
  transform: ${(props) => (props.index == 2 ? `translate(${props.translate}%)` : `translate(${props.translate}%,5px)`)};
  overflow: hidden;
  @media screen and (max-width: 601px) {
    background-position: center center;
    background-image: url(${(props) => backgroundM[props.index]});
  }
`;
