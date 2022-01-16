import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { errors, ethers, Transaction } from 'ethers';
import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AvatarComponent } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/Booking/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { RightPanelLoading } from '../components/Booking/RightPanelLoading'
import { TextField } from '../components/TextField';
import { API_URL, SYMBOL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { useCreator } from '../hooks/useCreator';
import { CreateUserDto, UserProfile } from '../hooks/useProfile';
import { theme } from '../styles/theme';
import { Description, Label } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { formatETH } from '../utils/format';
import { Number } from '../utils/validation';
import { RightPanel } from '../components/Booking/RightPanel';
import { ImagesSliderLoading } from '../components/Booking/ImagesSliderLoading';
import { useImagesLoaded } from '../hooks/useImagesLoaded';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 488px;
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
  margin-bottom: 64px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    width: 100%;
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    max-width: 100%;
  `}
`;

const ImagesColumnContainer = styled.div`
  position: relative;
  height: 460px;
  max-width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    overflow: hidden;
  `}
`;

const BookingCard = styled.div`
  background: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
`;

// TODO(johnrjj) - Make into Radio/RadioGroup
const PurchaseOption = styled.div`
  border: 1px solid ${(props) => props.theme.yellow};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

export interface CreateRequestDto {
  requester: string;
  requestId: number;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  txHash: string;
}

export interface ReadUserDto {
  address: string;
  bio: string;
  deliveryTime: number;
  demos: string[];
  id: number;
  profilePicture: string;
  price: string;
  tweetUrl: string;
  userName: string;
  twitterHandle: string;
}

const BookingPage = () => {
  const { creatorId } = useParams();
  const { account } = useWeb3React<Web3Provider>();

  const exchangeContract = useExchangeContract(true);
  const { creator, loaded } = useCreator(creatorId);

  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper>
        <PageGrid>
          <ImagesColumnContainer>
            {loaded && creator && creator.demos && <ImagesSlider images={creator.demos} />}
          </ImagesColumnContainer>
          {!loaded && <RightPanelLoading style={{ width: '100%' }} />}
          {!creator && loaded && <Label>Error loading creator</Label>}
          {!account && loaded && <Label>Error loading account</Label>}
          {creator && account && loaded && (
            <RightPanel
              creator={creator}
              account={account}
              exchangeContract={exchangeContract}
            />
          )}
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
