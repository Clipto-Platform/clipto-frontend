import React from 'react';
import ContentLoader from 'react-content-loader';
import { BookingCard } from './RightPanel';


const RightPanelLoading = (props: any) => (
  <BookingCard>
    <ContentLoader
      speed={2}
      width={443}
      height={1062}
      viewBox="0 0 443 1062"
      backgroundColor="#2b2b2b"
      foregroundColor="#1c1c1c"
      {...props}
    >
      <circle cx="419" cy="24" r="24" />
      <rect x="2" y="0" rx="8" ry="8" width="120" height="16" />
      <rect x="3" y="523" rx="10" ry="10" width="440" height="176" />
      <rect x="3" y="24" rx="8" ry="8" width="120" height="16" />
      <rect x="2" y="310" rx="8" ry="8" width="273" height="16" />
      <rect x="3" y="488" rx="8" ry="8" width="176" height="16" />
      <rect x="3" y="745" rx="8" ry="8" width="225" height="16" />
      <rect x="3" y="1014" rx="24" ry="24" width="440" height="48" />
      <rect x="3" y="869" rx="8" ry="8" width="136" height="16" />
      <rect x="2" y="894" rx="8" ry="8" width="280" height="16" />
      <rect x="3" y="398" rx="10" ry="10" width="176" height="48" />
      <rect x="3" y="781" rx="10" ry="10" width="440" height="48" />
      <rect x="0" y="926" rx="10" ry="10" width="260" height="48" />
      <rect x="2" y="334" rx="8" ry="8" width="348" height="16" />
      <rect x="3" y="358" rx="8" ry="8" width="348" height="16" />
      <rect x="2" y="81" rx="8" ry="8" width="440" height="16" />
      <rect x="2" y="105" rx="8" ry="8" width="440" height="16" />
      <rect x="3" y="178" rx="10" ry="10" width="440" height="96" />
    </ContentLoader>
  </BookingCard>
);

export { RightPanelLoading };
