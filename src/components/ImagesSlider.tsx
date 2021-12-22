import { useRef } from 'react';
import styled from 'styled-components';

import { LeftChevronIcon, RightChevonIcon } from './Chevrons';

const ChevronContainer = styled.div`
  height: 32px;
  width: 32px;
  background: #090909;
  border: 1px solid #2a2a2a;
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
  height: 440px;
  object-fit: cover;
  border-radius: 16px;
  :not(:last-child) {
    margin-right: 24px;
  }
`;

const ImageCardImg = styled.img`
  object-fit: cover;
  width: 300px;
  min-width: 300px;
  height: 440px;
  user-select: none;
`;

const ImageSliderContainerScrolllShadowContainer = styled.div`
  position: absolute;
  right: 0;
  width: 180px;
  opacity: 0.7;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #040404 100%);
  z-index: 1;
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
  images: Array<{
    src: string;
    key: string;
  }>;
}

const ImagesSlider: React.FC<ImagesSliderProps> = (props) => {
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
      <ImageSliderContainerScrolllShadowContainer />
      <ImagesSliderContainer ref={imageSliderContainerRef} style={{ marginBottom: 8 }}>
        {props.images.map((imgData) => {
          return (
            <ImageCardContainer key={imgData.key}>
              <ImageCardImg src={imgData.src} />
            </ImageCardContainer>
          );
        })}
      </ImagesSliderContainer>
      <SliderControlsContainer>
        <ChevronContainer style={{ marginRight: 16 }} onClick={handleScrollLeft}>
          <LeftChevronIcon />
        </ChevronContainer>
        <ChevronContainer onClick={handleScrollRight}>
          <RightChevonIcon />
        </ChevronContainer>
      </SliderControlsContainer>
    </>
  );
};

export { ImagesSlider };
