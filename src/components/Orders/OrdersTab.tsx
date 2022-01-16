
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AvatarComponent } from '../AvatarOrb';
import { PrimaryButton } from '../Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../Header';
import { PageContentWrapper, PageWrapper } from '../layout/Common';
import { OrderCard } from '../OrderCard';
import { Item, Tabs } from '../Tabs';
import { API_URL } from '../../config/config';
import { useExchangeContract } from '../../hooks/useContracts';
import { Description, Label } from '../../styles/typography';
import { checkIfDeadlinePassed } from '../../utils/time';

export type Request = {
  id: number;
  requestId: number;
  requester: string;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  delivered: boolean;
  txHash: string;
  created: string;
};

export const Status = styled.div`
  width: 90px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.1); //TODO(jonathanng) - color don't be lazy
  font-family: 'Scto Grotesk A';
  border-radius: 40px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4); //TODO(jonathanng) - color don't be lazy
}
`;

const TabContent = styled.div`
  margin-top: 48px;
`;

const SingleColumnPageContent = styled(PageContentWrapper)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export interface OrdersTabProps {
  FallbackWhenNoRequests: () => JSX.Element,
  requests: Request[],
  loaded: boolean,
  children: (requests: Request[]) => React.ReactNode
}

export const OrdersTab: React.FC<OrdersTabProps> = (props) => {
  const { FallbackWhenNoRequests, requests, loaded } = props;
  return (
    <TabContent >
      {!loaded && <Label>Loading Animation here</Label>}
      {loaded && requests.length === 0 && <FallbackWhenNoRequests />}
      {loaded && requests.length !== 0 && props.children(requests)}
    </TabContent>
  )
}