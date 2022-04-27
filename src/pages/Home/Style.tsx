import styled from 'styled-components';
import card1 from '../../assets/images/homepage/page1/card1.png';
import card2 from '../../assets/images/homepage/page1/card2.png';
import card3 from '../../assets/images/homepage/page1/card3.png';
import LeftArrow from '../../assets/images/homepage/LeftArrow.png';
import RightArrow from '../../assets/images/homepage/RightArrow.png';

export const OpacityGradient = styled.div`
  position: absolute;
  z-index: 50;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(10, 10, 10, 0.5));
  opacity: 0;
  transition: opacity 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    opacity: 1
  `};
`;

export const LeftContentWrapper = styled.div`
  position: relative;
  left: -120px;
  z-index: 100;
  padding: clamp(100px, 11vw, 200px) 0 clamp(160px, 20vw, 350px) 0;
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
  font-size: 16px;
  line-height: 19px;
  background-color: ${(props) => props.color};
  border-radius: 40px;
  padding: 14px 30px;
  width: fit-content;
  margin-right: 10px;
`;

export const BookNowButton = styled.button`
  font-size: clamp(14px, 2vw, 16px);
  font-family: 'Eina01-Bold';
  font-size: 16px;
  ine-height: 19px;
  background-color: ${(props) => props.color};
  border-radius: 40px;
  padding: 14px 30px;
  width: fit-content;
  border: transparent;
  color: white;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;
`;

export const CreatorText = styled.div`
  z-index: 10;
  max-width: 500px;
  right: 5%;
  position: absolute;
  top: 240px;
  padding: 5px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 70px;
    left: 5%;
  `}
`;

export const Name = styled.div`
  z-index: 10;
  font-family: 'Eina01-Bold';
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  font-family: 'Eina01-Bold';
  font-size: 14px;
  line-height: 16px;
  `}
`;
export const Title = styled.div`
  font-family: 'Eina01-Light';
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  font-family: 'Eina01-Light';
  font-size: 14px;
  line-height: 16px;
  `}
`;
export const Left = styled.button`
  position: absolute;
  left: 30px;
  top: 400px;
  background-image: url(${LeftArrow});
  background-size: contain;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  height: 25px;
  width: 25px;
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
  right: 30px;
  top: 400px;
  background-image: url(${RightArrow});
  background-size: contain;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  height: 25px;
  width: 25px;
  z-index: 10;
  opacity: 1;
  transition: opacity 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    opacity: 0;
    pointer-events: none;
  `}
`;
export const OvalSpacing = styled.div`
  z-index: 200;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 110px;
  position: absolute;
  top: clamp(500px, 45vw, 700px);
  justify-content: flex-start;
  transition: left 1s;
  @media screen and (max-width: 1200px) {
    padding: 0 32px;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    left: 10px;
    justify-content: flex-end;
    top: clamp(450px, 100vw,500px);
    padding:0 32px;
  `}
`;
export const Ovals = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 100;
`;
interface OvalProps {
  index: number;
  page: number;
}
export const Oval = styled.div<OvalProps>`
  background-color: ${(props) => (props.index == props.page ? props.theme.twitterBlue : '#6F6F6F')};
  width: 40px;
  height: 6px;
  border-radius: 10px;
  margin: 0 10px;
  transition: opacity 1s;
  z-index: 200;
  pointer-events: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 18px;
    height: 4px;
    margin: 0 5px;
  `}
`;
