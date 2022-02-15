import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

export const OrderCardLoadingContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  padding-top: 15px;
  margin-bottom: 32px;
  border-radius: 16px;
`;

const OrdersLoading = (props: any) => (
  <OrderCardLoadingContainer>
    <ContentLoader
      speed={2}
      width={540}
      height={240}
      viewBox="0 0 540 240"
      backgroundColor="#2b2b2b"
      foregroundColor="#1c1c1c"
      {...props}
    >
      <rect x="97" y="51" rx="0" ry="0" width="5" height="0" />
      <rect x="137" y="24" rx="0" ry="0" width="3" height="0" />
      <circle cx="44" cy="19" r="19" />
      <rect x="73" y="23" rx="0" ry="0" width="0" height="1" />
      <rect x="85" y="2" rx="6" ry="6" width="75" height="11" />
      <rect x="150" y="39" rx="0" ry="0" width="0" height="2" />
      <rect x="315" y="2" rx="6" ry="6" width="90" height="11" />
      <rect x="315" y="22" rx="6" ry="6" width="90" height="11" />
      <rect x="464" y="2" rx="6" ry="6" width="50" height="11" />
      <rect x="464" y="22" rx="6" ry="6" width="50" height="11" />
      <rect x="19" y="72" rx="6" ry="6" width="130" height="11" />
      <rect x="19" y="91" rx="8" ry="8" width="387" height="71" />
      <rect x="1" y="56" rx="0" ry="0" width="532" height="1" />
      <rect x="-1" y="34" rx="0" ry="0" width="1" height="20" />
      <rect x="85" y="22" rx="6" ry="6" width="75" height="11" />
      <rect x="18" y="193" rx="19" ry="19" width="145" height="35" />
    </ContentLoader>
  </OrderCardLoadingContainer>
);

export { OrdersLoading };
