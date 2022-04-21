import styled from 'styled-components';
import card1 from '../../assets/images/homepage/page1/card1.png';
import card2 from '../../assets/images/homepage/page1/card2.png';
import card3 from '../../assets/images/homepage/page1/card3.png';
import LeftArrow from '../../assets/images/homepage/LeftArrow.png';
import RightArrow from '../../assets/images/homepage/RightArrow.png';
import Bob from '../../assets/images/homepage/page2/bob.png';

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
  padding: 200px 10px clamp(200px, 20vw, 350px) 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    transform: translateY(150px)
  `}
  transition: transform 1s, width 1s;
`;

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: clamp(30px, 6.5vw, 40px);
  line-height: 125%;
  min-width: 360px;
  max-width: 550px;
  margin-bottom: 50px;
`;

export const BookNow = styled.h3`
  font-size: 16px;
  font-family: 'Eina01-Light';
  font-weight: 700;
  background-color: ${(props) => props.color};
  border-radius: 40px;
  padding: 13px 40px 17px 40px;
  width: fit-content;
`;
export const ImageCards1 = styled.div`
  position: absolute;
  z-index: -5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: clamp(630px, 89vw, 840px);
  height: clamp(510px, 73vw, 680px);
  right: calc(90px);
  transition: transform: 1s;
  @media (max-width: 1023px) {
    right: revert;
  }
`;
export const Card1 = styled.div`
  display: flex;
  flex-grow: 1;
  height: 80%;
  justify-content: center;
  align-items: center;
  background-image: url(${card1});
  background-size: cover;
  border-radius: 50px;
`;
export const Card2 = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url(${card2});
  background-size: cover;
  border-radius: 50px;
  margin: 0px 3%;
`;
export const Card3 = styled.div`
  display: flex;
  flex-grow: 1;
  height: 80%;
  justify-content: center;
  align-items: center;
  background-image: url(${card3});
  background-size: cover;
  border-radius: 50px;
`;

export const ImageCards2 = styled.div`
  position: absolute;
  top: 0px;
  right: calc(5%);
  z-index: 0;
  @media (max-width: 1400px) {
    right: revert;
  }
`;
export const CreatorText = styled.div`
  z-index: 10;
  max-width: 500px;
  right: 100px;
  position: absolute;
  top: 300px;
  transition: top 1s, right 1s;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 100px;
    right: 500px;
  `}
`;

export const CryptoStar = styled.div`
  background-image: url(${Bob});
  height: clamp(630px, 135vw, 840px);
  width: clamp(953px, 205vw, 1270px);
  background-size: cover;
`;
export const Name = styled.div`
  z-index: 10;
  font-size: 24px;
  font-family: 'Eina01';
  font-weight: 700;
`;
export const Title = styled.div`
  font-family: 'Eina01-Light';
  font-size: 24px;
`;
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

export const Ovals = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Oval = styled.div`
  background-color: ${(props) => (props.index == props.page ? props.theme.twitterBlue : '#6F6F6F')};
  width: 20px;
  height: 4px;
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
