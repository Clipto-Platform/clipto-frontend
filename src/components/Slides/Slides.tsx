import { useEffect, useRef, useState } from 'react';
import { HeaderSpacer } from '../Header/Header';
import {
  BackgroundWrapper,
  Left,
  OpacityGradient,
  Oval,
  Ovals,
  OvalSpacing,
  Right,
  SlideContentWrapper,
  SlidesContentWrapper,
} from './Style';

const Slides = (props: any) => {
  const NSlides = props.backgroundD.length;

  const [firstSlide, setFirstSlide] = useState<number>(0);
  const [lastSlide, setLastSlide] = useState<number>(NSlides - 1);
  const [visibleSlide, setVisibleSlide] = useState<number>(0);
  const [slidesPosition, setSlidesPosition] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<Array<number>>([...Array(NSlides)].fill(0));

  const [clickEnabled, setClickEnabled] = useState(true);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null as any);
  useEffect(() => {
    resetTimeout();
    if (NSlides > 1) timeoutRef.current = setTimeout(rightClick, 8000);

    return () => resetTimeout();
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  const leftClick = () => {
    resetTimeout();

    if (clickEnabled) {
      if (firstSlide == visibleSlide) {
        let temp = slidePosition;
        temp[lastSlide] = temp[lastSlide] - 100 * NSlides;

        setSlidePosition(temp);
        setSlidesPosition(slidesPosition + 100 / NSlides);
        setFirstSlide(lastSlide);
        setVisibleSlide(lastSlide);
        if (lastSlide == 0) setLastSlide(NSlides - 1);
        else setLastSlide(lastSlide - 1);
      } else {
        if (visibleSlide == 0) setVisibleSlide(NSlides - 1);
        else setVisibleSlide(visibleSlide - 1);
        setSlidesPosition(slidesPosition + 100 / NSlides);
      }

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
      if (lastSlide == visibleSlide) {
        let temp = slidePosition;
        temp[firstSlide] = temp[firstSlide] + 100 * NSlides;

        setSlidePosition(temp);
        setSlidesPosition(slidesPosition - 100 / NSlides);
        setLastSlide(firstSlide);
        setVisibleSlide(firstSlide);
        if (firstSlide == NSlides - 1) setFirstSlide(0);
        else setFirstSlide(firstSlide + 1);
      } else {
        if (visibleSlide == NSlides - 1) setVisibleSlide(0);
        else setVisibleSlide(visibleSlide + 1);
        setSlidesPosition(slidesPosition - 100 / NSlides);
      }

      setClickEnabled(false);
      setTimeout(() => {
        setClickEnabled(true);
        setIndex((prevIndex) => prevIndex + 1);
      }, 600);
    }
  };

  const onOvalClick = (index: number) => {
    if (
      (visibleSlide < index && !(visibleSlide == 0 && index == NSlides - 1)) ||
      (visibleSlide == NSlides - 1 && index == 0)
    ) {
      rightClick();
    } else leftClick();
  };
  return (
    <>
      {NSlides > 1 && (
        <>
          <Left onClick={leftClick} />
          <Right onClick={rightClick} />
          <OvalSpacing>
            <Ovals>
              {[...Array(NSlides)].map((_, index) => {
                return <Oval key={index} page={visibleSlide} index={index} onClick={() => onOvalClick(index)} />;
              })}
            </Ovals>
          </OvalSpacing>
        </>
      )}
      <SlideContentWrapper translate={slidesPosition} NSlides={NSlides}>
        {[...Array(NSlides)].map((_, index) => (
          <BackgroundWrapper
            key={index}
            translate={slidePosition[index]}
            index={index}
            backgroundM={props.backgroundM}
            backgroundD={props.backgroundD}
            //change to 3 when bob is back
            style={index === 2 ? { backgroundSize: '100%', backgroundRepeat: 'no-repeat' } : {}}
          >
            <OpacityGradient />
            <HeaderSpacer />
            <SlidesContentWrapper>
              {props.children[index]}
              <div style={{ maxWidth: '600px' }} />
            </SlidesContentWrapper>
          </BackgroundWrapper>
        ))}
      </SlideContentWrapper>
    </>
  );
};
export default Slides;
