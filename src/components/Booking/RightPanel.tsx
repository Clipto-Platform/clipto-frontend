import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { errors, ethers, Transaction } from 'ethers';
import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { API_URL, SYMBOL } from '../../config/config';
import { CliptoExchange } from '../../contracts';
import { useExchangeContract } from '../../hooks/useContracts';
import { CreateRequestDto, ReadUserDto } from '../../pages/Booking';
import { Description, Label } from '../../styles/typography';
import { getShortenedAddress } from '../../utils/address';
import { formatETH } from '../../utils/format';
import { Number } from '../../utils/validation';
import { AvatarComponent } from '../AvatarOrb';
import { PrimaryButton } from '../Button';
import { TextField } from '../TextField';
import { RightPanelLoading } from './RightPanelLoading';

export const BookingCard = styled.div`
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

export interface RightPanelProps {
  creator?: ReadUserDto;
  account?: string | null;
  loaded: boolean;
  children: (creator: ReadUserDto, account: string) => React.ReactNode;
}

export const RightPanel: React.FC<RightPanelProps> = (props) => {
  const { creator, account, loaded } = props;

  return (
    <>
      {!loaded && <RightPanelLoading style={{ width: '100%' }} />}
      {loaded && !creator && <Label>Error loading creator</Label>}
      {loaded && !account && <Label>Error loading account</Label>}
      {loaded && creator && account && props.children(creator, account)}
    </>
  );
};
