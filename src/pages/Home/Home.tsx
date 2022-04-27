import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { featuredCreators } from '../../api/index';
import { EntityCreator } from '../../api/types';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { BackgroundWrapper, SlidesMobile, SlidesDesktop } from '../../components/New/FrontPage';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import { CreatorCards } from '../../components/CreatorCards/CreatorCards';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../api';
import {
  LeftContentWrapper,
  HeroTitle,
  BookNow,
  Left,
  Right,
  Name,
  Title,
  OpacityGradient,
  Ovals,
  Oval,
  CreatorText,
  BookNowButton,
  OvalSpacing,
} from './Style';
import play from '../../assets/svgs/play.svg';
import { TEST } from '../../config/config';
import background1D from '../../assets/images/homepage/page1/background1D.png';
import background2D from '../../assets/images/homepage/page2/background2D.png';
import background3D from '../../assets/images/homepage/page3/background3D.png';
import background1M from '../../assets/images/homepage/page1/background1M.png';
import background2M from '../../assets/images/homepage/page2/background2M.png';
import background3M from '../../assets/images/homepage/page3/background3M.png';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { UserProfile } from '../../hooks/useProfile';

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

  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, -300]);
  const [clickEnabled, setClickEnabled] = useState(true);
  const [creator, setCreator] = useState<Partial<UserProfile> | null>();
  const backgroudImaged = [background1D, background2D, background3D];
  const backgroudImagem = [background1M, background2M, background3M];
  const user = useSelector((state: any) => state.user);
  const { account } = useWeb3React<Web3Provider>();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null as any);

  useEffect(() => {
    const getCreatorData = async () => {
      if (account) {
        try {
          const response = await api.creatorById(account || '');
          if (response.data && response.data.creator) {
            setCreator(response.data.creator);
          }
        } catch (e) {
          setCreator(null);
        }
      }
    };
    getCreatorData();
  }, [account]);

  let ovals = [];
  for (let i = 0; i < 3; i++) {
    ovals.push(
      <Oval
        page={page}
        index={i}
        onClick={() => {
          onOvalClick(i);
        }}
      />,
    );
  }
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

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(rightClick, 8000);

    return () => {
      resetTimeout();
    };
  }, [index]);

  const leftClick = () => {
    //allows user to click left arrow every .6 seconds
    resetTimeout();
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
      setSlidesPosition(slidesPosition + 100 / 3);
      setClickEnabled(false);
      setTimeout(() => {
        setClickEnabled(true);
        setIndex((prevIndex) => prevIndex + 1);
      }, 600);
    }
  };
  const rightClick = () => {
    //allows user to click right arrow every .6 seconds
    resetTimeout();
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
      setSlidesPosition(slidesPosition - 100 / 3);
      setClickEnabled(false);
      setTimeout(() => {
        setClickEnabled(true);
        setIndex((prevIndex) => prevIndex + 1);
      }, 600);
    }
  };

  const onOvalClick = (index: number) => {
    if ((page < index && !(page == 0 && index == 2)) || (page == 2 && index == 0)) {
      rightClick();
    } else if ((page > index && !(page == 2 && index == 0)) || (page == 0 && index == 2)) {
      leftClick();
    }
  };
  const warning = (msg: string) => {
    toast.warn(msg);
  };
  const slides = (backgroudImage: string[]) => {
    let background = backgroudImage;
    let slideArray: Array<any> = [];
    let slideContent = [
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Personalized videos from your favorite{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
          </HeroTitle>
          <div style={{ display: 'inline-block', width: 'fit-content' }}>
            <Link to={'/explore'}>
              <BookNow color={'#5F21E2'}>Book Now</BookNow>
            </Link>
          </div>
        </LeftContentWrapper>
        <div style={{ maxWidth: '600px' }} />
      </>,
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Personalized videos from your favorite{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
          </HeroTitle>
          <div style={{ display: 'inline-block', width: 'fit-content' }}>
            <Link to={'/creator/0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f'}>
              <BookNow color={'#1DA1F2'}>Book with Bob</BookNow>
            </Link>
          </div>
        </LeftContentWrapper>
        <CreatorText>
          <Name>Bob Burnquist</Name>
          <Title>Skateboarder</Title>
        </CreatorText>
        <div style={{ maxWidth: '600px' }} />
      </>,
      <>
        <LeftContentWrapper>
          <HeroTitle>
            Become a creator
            <br />
            Make a CLIPTO profile <span style={{ color: theme.yellow, fontWeight: '700' }}>now</span>
          </HeroTitle>
          <div style={{ display: 'inline-block', width: 'fit-content' }}>
            {user && creator ? (
              <BookNowButton
                color={'#5F21E2'}
                onClick={() => {
                  warning("You're already a creator");
                }}
              >
                Become a Creator
              </BookNowButton>
            ) : user ? (
              <Link to={'/onboarding'}>
                <BookNow color={'#5F21E2'}>Become a Creator</BookNow>
              </Link>
            ) : (
              <BookNowButton color={'#5F21E2'} onClick={() => warning('Please connect your wallet')}>
                Become a Creator
              </BookNowButton>
            )}
          </div>
        </LeftContentWrapper>
        <div style={{ maxWidth: '600px' }} />
      </>,
    ];
    background.map((element, index) => {
      slideArray.push(
        <BackgroundWrapper
          background={element}
          translate={slidePosition[index]}
          index={index}
          // style={{ backgroundPosition: index == 2 ? 'center' : 'center right 20%' }}
        >
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
        <OvalSpacing>
          <Ovals>{ovals}</Ovals>
          <div />
        </OvalSpacing>
        <SlidesDesktop translate={slidesPosition}>{slides(backgroudImaged)}</SlidesDesktop>
        <SlidesMobile translate={slidesPosition}>{slides(backgroudImagem)}</SlidesMobile>
        <UserDisplay users={creators} handleScroll={() => {}} hasMore={false} title="Featured" />
        <CreatorCards />
      </PageWrapper>
    </>
  );
};

export { HomePage };
