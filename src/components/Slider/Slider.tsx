import { useEffect, useState } from 'react';
import {
  Slides,
  BackgroundWrapper,
  OpacityGradient,
  LeftContentWrapper,
  HeroTitle,
  BookNow,
  Ovals,
  Oval,
  CreatorText,
  Name,
  Title,
  Left,
  Right,
} from './Style';
import { PageContentWrapper } from '../layout/Common';
import { HeaderSpacer } from '../../components/Header/Header';
import { useTheme } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import background1 from '../../assets/images/homepage/background1.png';
import background2 from '../../assets/images/homepage/background2.png';
import background3 from '../../assets/images/homepage/background3.jpg';

const Slider = (props: any) => {
  const theme = useTheme();

  const backgrounds = [background1, background2, background3];
  const heroTitleTexts = [
    'Personalized videos from your favorite',
    'Personalized videos from your favorite',
    'Become a creator Make a CLIPTO profile',
  ];
  const heroTitleYellowText = ['crypto stars', 'crypto stars', 'now'];
  const buttonLinks = ['/explore', '/creator/0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f', '/explore'];
  const buttonTexts = ['Book Now', 'Book with Bob', 'Become a Creator'];
  const buttonColors = ['#5F21E2', theme.twitterBlue, '#5F21E2'];
  const rightContents = [
    <div style={{ width: 0 }} />,
    <CreatorText>
      <Name>Bob Burnquist</Name>
      <Title>Skateboarder</Title>
    </CreatorText>,
    <div style={{ width: 0 }} />,
  ];

  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, -300]);
  const [clickEnabled, setClickEnabled] = useState(true);

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

  const onOvalClick = (index: number) => {
    if ((page < index && !(page == 0 && index == 2)) || (page == 2 && index == 0)) {
      rightClick();
    } else if ((page > index && !(page == 2 && index == 0)) || (page == 0 && index == 2)) {
      leftClick();
    }
  };

  const customSlideContent = (
    background: any,
    slidePosition: number,
    index: number,
    heroTitleText: string,
    heroTitleYellowText: string,
    buttonLink: string,
    buttonText: string,
    buttonColor: string,
    rightContent: any,
  ) => {
    let ovals = [];
    for (let i = 0; i < backgrounds.length; i++) {
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
    return (
      <BackgroundWrapper background={background} translate={slidePosition} index={index}>
        <OpacityGradient />
        <HeaderSpacer />
        <PageContentWrapper style={{ justifyContent: 'space-around' }}>
          <LeftContentWrapper>
            <HeroTitle>
              {heroTitleText} <span style={{ color: theme.yellow, fontWeight: '700' }}>{heroTitleYellowText}</span>
            </HeroTitle>
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Link to={buttonLink}>
                <BookNow color={buttonColor}>{buttonText}</BookNow>
              </Link>
              <Ovals>{ovals}</Ovals>
            </div>
          </LeftContentWrapper>
          <div style={{ maxWidth: '600px' }} />
          {rightContent}
        </PageContentWrapper>
      </BackgroundWrapper>
    );
  };
  return (
    <>
      <Left onClick={leftClick} />
      <Right onClick={rightClick} />
      <Slides translate={slidesPosition}>
        {backgrounds.map((element, index) =>
          customSlideContent(
            element,
            slidePosition[index],
            index,
            heroTitleTexts[index],
            heroTitleYellowText[index],
            buttonLinks[index],
            buttonTexts[index],
            buttonColors[index],
            rightContents[index],
          ),
        )}
      </Slides>
    </>
  );
};
export { Slider };
