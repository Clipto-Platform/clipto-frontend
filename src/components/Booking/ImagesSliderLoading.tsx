import React from 'react';
import ContentLoader from 'react-content-loader';

const ImagesSliderLoading = (props: any) => (
  <ContentLoader
    speed={2}
    width={505}
    height={496}
    viewBox="0 0 505 496"
    backgroundColor="#2b2b2b"
    foregroundColor="#1c1c1c"
    {...props}
  >
    <circle cx="489" cy="480" r="16" />
    <rect x="0" y="0" rx="10" ry="10" width="300" height="440" />
    <rect x="324" y="0" rx="10" ry="10" width="175" height="440" />
    <circle cx="440" cy="480" r="16" />
  </ContentLoader>
);

export { ImagesSliderLoading };
