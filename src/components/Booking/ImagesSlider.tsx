import { useRef } from 'react';
import { Tweet } from 'react-twitter-widgets';
import styled from 'styled-components';

import { useImagesLoaded } from '../../hooks/useImagesLoaded';
import { Description, Label } from '../../styles/typography';
import { LeftChevronIcon, RightChevonIcon } from '../Chevrons';
import { ImagesSliderLoading } from './ImagesSliderLoading';

const ChevronContainer = styled.div`
  height: 32px;
  width: 32px;
  background: #090909;
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: all 0.15s ease;
  cursor: pointer;
  :hover {
    border: 1px solid ${(props) => props.theme.lightGray};
  }
`;

const ImageCardContainer = styled.div`
  width: 300px;
  min-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  :not(:last-child) {
    margin-right: 24px;
  }
`;

const ImageSliderContainerScrolllShadowContainer = styled.div`
  position: absolute;
  right: 0;
  width: 180px;
  max-height: 400px;
  opacity: 0.7;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #040404 100%);
`;

const ImagesSliderContainer = styled.div`
  overflow-x: auto;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: row;
  flex-wrap: none;
`;

const SliderControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
`;

export interface ImagesSliderProps {
  images: string[];
}

const ImagesSlider: React.FC<ImagesSliderProps> = (props) => {
  const { handleLoad, imagesDone, singleLoaded } = useImagesLoaded(props.images.length);
  // TODO(johnrjj) - Implement grab to scroll
  const imageSliderContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    const curScroll = imageSliderContainerRef.current?.scrollLeft ?? 0;
    imageSliderContainerRef.current?.scrollTo({
      left: curScroll + 150,
      behavior: 'smooth',
    });
  };

  const handleScrollLeft = () => {
    const curScroll = imageSliderContainerRef.current?.scrollLeft ?? 0;
    imageSliderContainerRef.current?.scrollTo({
      left: Math.max(0, curScroll - 150),
      behavior: 'smooth',
    });
  };

  return (
    <>
      {!singleLoaded && <ImagesSliderLoading style={{ width: '100%' }} />}
      <ImagesSliderContainer ref={imageSliderContainerRef} style={{ marginBottom: 8 }}>
        {imagesDone && props.images.length === 0 && (
          <div style={{ textAlign: 'center', display: 'flex', marginBottom: 24, marginTop: 80, width: '100%' }}>
            <div style={{ display: 'block', width: '100%' }}>
              <Label style={{ marginBottom: '40px' }}>This creator does not have any videos shared.</Label>
            </div>
          </div>
        )}
        {props.images.map((imgSrc, n) => {
          return (
            <ImageCardContainer key={n.toString()}>
              <div>
                <Tweet
                  onLoad={handleLoad}
                  renderError={() => {
                    return (
                      <Description style={{ margin: 'auto', marginTop: 100, maxWidth: 200 }}>
                        Error loading this tweet. If you are the creator, go to settings and check your tweets
                      </Description>
                    );
                  }}
                  options={{ theme: 'dark' }}
                  tweetId={imgSrc.split('/').pop()?.split('?')[0] || '0'}
                />
              </div>
            </ImageCardContainer>
          );
        })}
      </ImagesSliderContainer>

      {singleLoaded && props.images.length !== 0 && (
        <SliderControlsContainer>
          <ChevronContainer
            style={{ marginRight: 16 }}
            onClick={(e) => {
              handleScrollLeft();
            }}
          >
            <LeftChevronIcon />
          </ChevronContainer>
          <ChevronContainer onClick={handleScrollRight}>
            <RightChevonIcon />
          </ChevronContainer>
        </SliderControlsContainer>
      )}
    </>
  );
};

export { ImagesSlider };
