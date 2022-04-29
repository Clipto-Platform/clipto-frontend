import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../hooks/useProfile';

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
  SlideContentWrapper,
  BackgroundWrapper,
} from './Style';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../layout/Common';
import { HeaderContentGapSpacer, HeaderSpacer } from '../Header/Header';

const Slides = () => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);

  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, -300]);
  const [clickEnabled, setClickEnabled] = useState(true);
  const [index, setIndex] = useState(0);
  const [creator, setCreator] = useState<Partial<UserProfile> | null>();
  const timeoutRef = useRef(null as any);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(rightClick, 8000);

    return () => {
      resetTimeout();
    };
  }, [index]);

  let ovals = [];
  for (let i = 0; i < 3; i++) {
    ovals.push(<Oval page={page} index={i} onClick={() => onOvalClick(i)} />);
  }

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  const warning = (msg: string) => {
    toast.warn(msg);
  };

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

  const customSlides = () => {
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
            Make a <span style={{ fontFamily: 'Eina01-Bold' }}>CLIPTO</span> profile{' '}
            <span style={{ color: theme.yellow, fontWeight: '700' }}>now</span>
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
    slideContent.map((element, index) => {
      slideArray.push(
        <BackgroundWrapper translate={slidePosition[index]} index={index}>
          <OpacityGradient />
          <HeaderSpacer />
          <PageContentWrapper style={{ justifyContent: 'space-around' }}>{slideContent[index]}</PageContentWrapper>
        </BackgroundWrapper>,
      );
    });
    return slideArray;
  };
  return (
    <>
      <Left onClick={leftClick} />
      <Right onClick={rightClick} />
      <OvalSpacing>
        <Ovals>{ovals}</Ovals>
      </OvalSpacing>
      <SlideContentWrapper translate={slidesPosition}>{customSlides()}</SlideContentWrapper>
    </>
  );
};
export default Slides;
