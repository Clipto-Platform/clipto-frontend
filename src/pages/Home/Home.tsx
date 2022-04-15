import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { featuredCreators } from '../../api/index';
import { EntityCreator } from '../../api/types';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { BackgroundWrapper, Slides } from '../../components/New/FrontPage';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import { CreatorCards } from '../../components/CreatorCards/CreatorCards';
import { Link, useNavigate } from 'react-router-dom';
import {
  LeftContentWrapper,
  HeroTitle,
  BookNow,
  ImageCards1,
  ImageCards2,
  Card1,
  Card2,
  Card3,
  Left,
  Right,
  CryptoStar,
  Name,
  Title,
} from './Style';
import play from '../../assets/svgs/play.svg';
import { TEST } from '../../config/config';
import background1 from '../../assets/images/homepage/page1/background.png';
import background2 from '../../assets/images/homepage/page2/background.png';
import background3 from '../../assets/images/homepage/page3/background.png';

const featuredList: string[] = [
  '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8', // Gabriel Haines.eth
  '0x0f32c8fBD8FE29D5EF451Ed9F8a13062C00ED583', // Fedrick
  '0x8d86932d23d3766fe317b0e385fcac24806ba9a3', // Lee Eller
  '0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f', // bobburnquist
  '0x1c6f1a832e73949c97fe335a98b6a5fc3c9c29e9', // mackrypto
];
const featuredListTest: string[] = [
  '0x7c98c2dec5038f00a2cbe8b7a64089f9c0b51991', // atul
  '0x8528f9805a82158c22814bda63015537a5e670c3', // rushi
  '0x7cacbc75d74740b50dc68fbf0a573af80243ca56', // jon
  '0x6e4cd1a58e0d1309da36f1ce1e456e5b93483175', // lee
];
const HomePage = () => {
  let [creators, setCreators] = useState<EntityCreator[]>([]);

  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(-100);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, 0]);
  console.log(slidesPosition, slidePosition);
  useEffect(() => {
    const creatorAddresses = TEST
      ? featuredListTest.map((c) => c.toLowerCase())
      : featuredList.map((c) => c.toLowerCase());

    featuredCreators(creatorAddresses).then((response) => {
      if (response.data) {
        const sorted = response.data.creators.sort((a, b) => {
          return creatorAddresses.indexOf(a.address.toLowerCase()) - creatorAddresses.indexOf(b.address.toLowerCase());
        });
        setCreators(sorted);
      }
    });
  });

  const leftClick = () => {
    let temp = slidePosition;
    if (slidesPosition % 300 == 0) temp[1] = slidePosition[1] - 300;
    else if (slidesPosition % 300 == 100 || slidesPosition % 300 == -200) temp[0] = slidePosition[0] - 300;
    else if (slidesPosition % 300 == 200 || slidesPosition % 300 == -100) temp[2] = slidePosition[2] - 300;
    console.log(temp);
    setSlidePosition(temp);
    setSlidesPosition(slidesPosition + 100);
  };
  const rightClick = () => {
    let temp = slidePosition;
    if (slidesPosition % 300 == 0) temp[2] = slidePosition[2] + 300;
    else if (slidesPosition % 300 == 100 || slidesPosition % 300 == -200) temp[1] = slidePosition[1] + 300;
    else if (slidesPosition % 300 == 200 || slidesPosition % 300 == -100) temp[0] = slidePosition[0] + 300;
    setSlidePosition(temp);
    setSlidesPosition(slidesPosition - 100);
  };

  const theme = useTheme();
  return (
    <>
      <PageWrapper>
        <Left onClick={leftClick} />
        <Right onClick={rightClick} />
        <Slides translate={slidesPosition}>
          <BackgroundWrapper background={background1} translate={slidePosition[0]}>
            <HeaderSpacer />
            {/* <HeaderContentGapSpacer /> */}
            <PageContentWrapper>
              {/* <ContentWrapper> */}
              <LeftContentWrapper>
                <HeroTitle>
                  Personalized videos from your favorite{' '}
                  <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
                </HeroTitle>
                <Link to={'/explore'}>
                  <BookNow color={'#5F21E2'}>Book Now</BookNow>
                </Link>
              </LeftContentWrapper>
              <ImageCards1>
                <Card1>
                  <img src={play} style={{ height: '80px' }} />
                </Card1>
                <Card2>
                  <img src={play} style={{ height: '100px' }} />
                </Card2>
                <Card3>
                  <img src={play} style={{ height: '80px' }} />
                </Card3>
              </ImageCards1>
            </PageContentWrapper>
          </BackgroundWrapper>
          <BackgroundWrapper background={background2} translate={slidePosition[1]}>
            <HeaderSpacer />
            {/* <HeaderContentGapSpacer /> */}
            <PageContentWrapper>
              {/* <ContentWrapper> */}
              <LeftContentWrapper>
                <HeroTitle>
                  Personalized videos from your favorite{' '}
                  <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
                </HeroTitle>
                <Link to={'/creator/0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f'}>
                  <BookNow color={'#1DA1F2'}>Book with Bob</BookNow>
                </Link>
              </LeftContentWrapper>
              <ImageCards2>
                <div style={{ zIndex: 10, maxWidth: 500, right: 100, position: 'absolute', top: 300 }}>
                  <Name>Bob Burnquist</Name>
                  <Title>Skateboarder</Title>
                </div>
                <CryptoStar />
              </ImageCards2>
              {/* </ContentWrapper> */}
            </PageContentWrapper>
          </BackgroundWrapper>
          <BackgroundWrapper background={background3} translate={slidePosition[2]}>
            <HeaderSpacer />
            {/* <HeaderContentGapSpacer /> */}
            <PageContentWrapper>
              {/* <ContentWrapper> */}
              <LeftContentWrapper>
                <HeroTitle>
                  Personalized videos from your favorite{' '}
                  <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
                </HeroTitle>
                <Link to={'/explore'}>
                  <BookNow color={'#5F21E2'}>Become a Creator</BookNow>
                </Link>
              </LeftContentWrapper>
              <div />
              {/* </ContentWrapper> */}
            </PageContentWrapper>
          </BackgroundWrapper>
        </Slides>
        <UserDisplay users={creators} handleScroll={() => {}} hasMore={false} title="Featured" />
        <CreatorCards />
      </PageWrapper>
    </>
  );
};

export { HomePage };
