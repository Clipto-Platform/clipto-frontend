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
  OpacityGradient,
  Ovals,
  Oval,
  CreatorText,
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
  '0x8b2a6a22ec055225C4c4b5815e7d9F566b8be68F', // rushi
  '0x7cacbc75d74740b50dc68fbf0a573af80243ca56', // jon
  '0x6e4cd1a58e0d1309da36f1ce1e456e5b93483175', // lee
];
const HomePage = () => {
  let [creators, setCreators] = useState<EntityCreator[]>([]);
  // console.log(window.innerWidth);
  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(-33.33);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, 0]);
  const [clickEnabled, setClickEnabled] = useState(true);

  console.log(slidesPosition);

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
    //allows user to click left arrow every .6 seconds
    if (clickEnabled) {
      let temp = slidePosition;
      const round = Math.round(slidesPosition) % 100;

      if (round == 0) {
        temp[1] = slidePosition[1] - 300;
        setPage(2);
      } else if (round == 33 || round == -67) {
        temp[0] = slidePosition[0] - 300;
        setPage(1);
      } else if (round == 67 || round == -33) {
        temp[2] = slidePosition[2] - 300;
        setPage(0);
      }

      setSlidePosition(temp);
      setSlidesPosition(slidesPosition + 33.33);
      setClickEnabled(false);
      setTimeout(() => {
        setClickEnabled(true);
      }, 600);
    }
  };
  const rightClick = () => {
    //allows user to click right arrow every .6 seconds
    if (clickEnabled) {
      let temp = slidePosition;
      const round = Math.round(slidesPosition) % 100;

      if (round == 0) {
        temp[2] = slidePosition[2] + 300;
        setPage(1);
      } else if (round == 33 || round == -67) {
        temp[1] = slidePosition[1] + 300;
        setPage(0);
      } else if (round == 67 || round == -33) {
        temp[0] = slidePosition[0] + 300;
        setPage(2);
      }

      setSlidePosition(temp);
      setSlidesPosition(slidesPosition - 33.33);
      setClickEnabled(false);
      setTimeout(() => {
        setClickEnabled(true);
      }, 700);
    }
  };

  const slides = () => {
    let background = [background1, background2, background3];
    let slideArray: Array<any> = [];
    let ovals = [];
    for (let i = 0; i < 3; i++) {
      ovals.push(<Oval page={page} index={i} />);
    }
    let slideContent = [
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Personalized videos from your favorite{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
          </HeroTitle>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to={'/explore'}>
              <BookNow color={'#5F21E2'}>Book Now</BookNow>
            </Link>
            <Ovals>{ovals}</Ovals>
          </div>
        </LeftContentWrapper>
        <div style={{ maxWidth: '600px' }} />
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
      </>,
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Personalized videos from your favorite{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
          </HeroTitle>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to={'/creator/0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f'}>
              <BookNow color={'#1DA1F2'}>Book with Bob</BookNow>
            </Link>
            <Ovals>{ovals}</Ovals>
          </div>
        </LeftContentWrapper>
        <div style={{ maxWidth: '600px' }} />
        <ImageCards2>
          <CreatorText>
            <Name>Bob Burnquist</Name>
            <Title>Skateboarder</Title>
          </CreatorText>
          <CryptoStar />
        </ImageCards2>
      </>,
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Personalized videos from your favorite{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
          </HeroTitle>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to={'/explore'}>
              <BookNow color={'#5F21E2'}>Become a Creator</BookNow>
            </Link>
            <Ovals>{ovals}</Ovals>
          </div>
        </LeftContentWrapper>
        <div style={{ maxWidth: '600px' }} />
      </>,
    ];
    background.map((element, index) => {
      slideArray.push(
        <BackgroundWrapper background={element} translate={slidePosition[index]}>
          <OpacityGradient />
          <HeaderSpacer />
          {/* <HeaderContentGapSpacer /> */}
          <PageContentWrapper style={{ justifyContent: 'space-around' }}>
            {/* <ContentWrapper> */}
            {slideContent[index]}
            {/* </ContentWrapper> */}
          </PageContentWrapper>
        </BackgroundWrapper>,
      );
    });
    return slideArray;
  };

  const theme = useTheme();
  return (
    <>
      <PageWrapper style={{ top: 0 }}>
        <Left onClick={leftClick} />
        <Right onClick={rightClick} />
        <Slides translate={slidesPosition}>{slides()}</Slides>
        <UserDisplay users={creators} handleScroll={() => {}} hasMore={false} title="Featured" />
        <CreatorCards />
      </PageWrapper>
    </>
  );
};

export { HomePage };
