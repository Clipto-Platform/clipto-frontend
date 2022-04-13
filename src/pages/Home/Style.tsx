import styled from 'styled-components';
import card1 from '../../assets/images/homepage/page1/card1.png';
import card2 from '../../assets/images/homepage/page1/card2.png';
import card3 from '../../assets/images/homepage/page1/card3.png';
import phone1 from '../../assets/images/homepage/page2/phone1.png';
import phone2 from '../../assets/images/homepage/page2/phone2.png';
import LeftArrow from '../../assets/images/homepage/LeftArrow.png';
import RightArrow from '../../assets/images/homepage/RightArrow.png';
import Bob from '../../assets/images/homepage/page3/bob.png';

export const LeftContentWrapper = styled.div`
  display: inline-block;
  float: left;
  z-index: 10;
`;

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 36px;
  line-height: 125%;
  margin: 150px 10px 50px 10px;
  max-width: 520px;
  width: min-content
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 36px;
  `};
`;

export const BookNow = styled.h3`
  font-size: 16px;
  font-family: 'Eina01';
  font-weight: 700;
  background-color: #5f21e2;
  border-radius: 40px;
  padding: 10px 40px 14px 40px;
  margin: 0px 0px 270px 0px;
  width: fit-content;
`;
export const ImageCards1 = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const Card1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card1});
  background-size: cover;
  min-width: 170px;
  height: 380px;
  border-radius: 20px;
  margin-right: 5px;
`;
export const Card2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card2});
  background-size: cover;
  min-width: 200px;
  height: 467px;
  border-radius: 20px;
  margin: 0px 5px;
`;
export const Card3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${card3});
  background-size: cover;
  min-width: 180px;
  height: 380px;
  border-radius: 20px;
  margin-left: 5px;
`;
export const ImageCards2 = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const Phone1 = styled.div`
  background-image: url(${phone1});
  background-size: cover;
  height: 540px;
  width: 360px;
  margin-right: 230px;
`;
export const Phone2 = styled.div`
  position: absolute;
  background-image: url(${phone2});
  background-size: cover;
  height: 690px;
  width: 450px;
  transform: translate(50px, 30px);
`;
export const ImageCards3 = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const CryptoStar = styled.div`
  background-image: url(${Bob});
  height: 600px;
  width: 860px;
  background-size: cover;
  position: absolute;
  top: 95px;
  right: 15%;
`;
export const Name = styled.div`
  z-index: 10;
  font-size: 24px;
  font-family: 'Eina01';
  font-weight: 700;
`;
export const Title = styled.div``;
export const Left = styled.button`
  background-image: url(${LeftArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 23px;
  margin-right: 10px;
  z-index: 10;
`;
export const Right = styled.button`
  background-image: url(${RightArrow});
  background-size: cover;
  background-color: transparent;
  border: none;
  height: 23px;
  margin-left: 10px;
  z-index: 10;
`;
