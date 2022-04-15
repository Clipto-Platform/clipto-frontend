import styled from 'styled-components';
import card1 from '../../assets/images/homepage/page1/card1.png';
import card2 from '../../assets/images/homepage/page1/card2.png';
import card3 from '../../assets/images/homepage/page1/card3.png';
import LeftArrow from '../../assets/images/homepage/LeftArrow.png';
import RightArrow from '../../assets/images/homepage/RightArrow.png';
import Bob from '../../assets/images/homepage/page2/bob.png';

export const LeftContentWrapper = styled.div`
  z-index: 10;
  padding: 200px 20px 400px 20px;
  width: 85%;
`;

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  min-width: 231px;
  max-width: 550px;
  width: min-content
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 36px;
  `};
  margin-bottom: 50px;
`;

export const BookNow = styled.h3`
  font-size: 16px;
  font-family: 'Eina01';
  font-weight: 700;
  background-color: ${(props) => props.color};
  border-radius: 40px;
  padding: 10px 40px 14px 40px;
  width: fit-content;
`;
export const ImageCards1 = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: fit-content;
  right: 90px;
  @media (max-width: 820px) {
    right: revert;
  }
`;
export const Card1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card1});
  background-size: cover;
  width: 250px;
  height: 550px;
  border-radius: 50px;
  margin-right: 10px;
`;
export const Card2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card2});
  background-size: cover;
  width: 300px;
  height: 680px;
  border-radius: 50px;
  margin: 0px 10px;
`;
export const Card3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card3});
  background-size: cover;
  width: 250px;
  height: 550px;
  border-radius: 50px;
  margin-left: 10px;
`;

export const ImageCards2 = styled.div`
  position: absolute;
  top: 15px;
  right: 10%;
`;
export const CryptoStar = styled.div`
  background-image: url(${Bob});
  height: 880px;
  width: 1270px;
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
  left: 30px;
  top: 400px;
  background-image: url(${LeftArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 17px;
  z-index: 10;
`;
export const Right = styled.button`
  position: absolute;
  right: 30px;
  top: 400px;
  background-image: url(${RightArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 17px;
  z-index: 10;
`;
