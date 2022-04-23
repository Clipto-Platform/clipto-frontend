import styled from 'styled-components';
import LeftArrow from '../../assets/images/homepage/LeftArrow.png';
import RightArrow from '../../assets/images/homepage/RightArrow.png';

export const Left = styled.button`
  position: absolute;
  left: clamp(0px, 4% - 8px, 50px);
  top: 400px;
  background-image: url(${LeftArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 17px;
  z-index: 10;
  opacity: 1;
  transition: opacity 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    opacity: 0;
    pointer-events: none;
  `}
`;
export const Right = styled.button`
  position: absolute;
  right: clamp(0px, 4% - 8px, 50px);
  top: 400px;
  background-image: url(${RightArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 17px;
  z-index: 10;
  opacity: 1;
  transition: opacity 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    opacity: 0;
    pointer-events: none;
  `}
`;

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
`;

export const OpacityGradient = styled.div`
  position: absolute;
  z-index: 50;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(10, 10, 10, 1));
  opacity: 0;
  transition: opacity 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    opacity: 1
  `};
`;

export const LeftContentWrapper = styled.div`
  z-index: 100;
  padding: clamp(100px, 15vw, 200px) 0px clamp(160px, 20vw, 350px) 0px;
  transition: transform 1s, width 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    transform: translateY(150px);
    left:0;
  `}
`;

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: clamp(26px, 6.5vw, 40px);
  line-height: 125%;
  min-width: 260px;
  max-width: 550px;
  margin-bottom: 50px;
`;

export const BookNow = styled.h3`
  font-size: clamp(14px, 2vw, 16px);
  font-family: 'Eina01-Bold';
  background-color: ${(props) => props.color};
  border-radius: 40px;
  padding: 14px 30px;
  width: fit-content;
`;

export const Ovals = styled.div`
  display: flex;
  flex-direction: row;
`;

interface OvalProps {
  index: number;
  page: number;
}
export const Oval = styled.div<OvalProps>`
  background-color: ${(props) => (props.index == props.page ? props.theme.twitterBlue : '#6F6F6F')};
  width: 25px;
  height: 5px;
  border-radius: 10px;
  margin: 0 5px 0 5px;
  opacity: 0;
  transition: opacity 1s;
  pointer-events: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      opacity: 1;
      pointer-events: revert;
    `}
`;

export const CreatorText = styled.div`
  z-index: 10;
  max-width: 500px;
  right: 5%;
  position: absolute;
  top: 270px;
  padding: 5px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 70px;
    left: 5%;
  `}
`;

export const Name = styled.div`
  z-index: 10;
  font-size: 24px;
  font-family: 'Eina01';
  font-weight: 700;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 14px;
    line-height: 16.41px;
    color: #FFFFFF;
  `}
`;
export const Title = styled.div`
  font-family: 'Eina01-Light';
  font-size: 24px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  font-size: 14px;
  line-height: 16.41px;
  color: #FFFFFF;
  `}
`;
