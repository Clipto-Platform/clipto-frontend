import { useEffect, useRef, useState } from 'react';
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

const Slides = (props: any) => {
  const [page, setPage] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([0, 0, -300]);
  const [clickEnabled, setClickEnabled] = useState(true);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null as any);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(rightClick, 8000);

    return () => resetTimeout();
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  const leftClick = () => {
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
  return (
    <>
      <Left onClick={leftClick} />
      <Right onClick={rightClick} />
      <OvalSpacing>
        <Ovals>
          {[...Array(3)].map((_, index) => (
            <Oval page={page} index={index} onClick={() => onOvalClick(index)} />
          ))}
        </Ovals>
      </OvalSpacing>
      <SlideContentWrapper translate={slidesPosition}>
        {[...Array(3)].map((_, index) => (
          <BackgroundWrapper
            translate={slidePosition[index]}
            index={index}
            backgroundM={props.backgroundM}
            backgroundD={props.backgroundD}
          >
            <OpacityGradient />
            <HeaderSpacer />
            <PageContentWrapper style={{ justifyContent: 'space-around' }}>
              {props.children[index]}
              <div style={{ maxWidth: '600px' }} />
            </PageContentWrapper>
          </BackgroundWrapper>
        ))}
      </SlideContentWrapper>
    </>
  );
};
export default Slides;
