import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { AvatarComponent, AvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { TextField } from '../components/TextField';
import { API_URL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { UserProfile } from '../hooks/useProfile';
import { Description, Label } from '../styles/typography';

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
  height: 440px;
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
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  txHash: string;
  created?: string;
}

const BookingPage = () => {
  const { creatorId } = useParams();
  const { account } = useWeb3React<Web3Provider>();

  const exchangeContract = useExchangeContract(true);
  const [creatorProfile, setCreatorProfile] = useState<Partial<UserProfile>>();

  const [request, setRequest] = useState<Partial<CreateRequestDto>>({});

  useEffect(() => {
    const getCreatorData = async () => {
      if (creatorId) {
        const contractProfile = await exchangeContract.creators(creatorId);
        const restContractProfile = await axios.get(`${API_URL}/user/${creatorId}`);
        setCreatorProfile(restContractProfile.data);
        // todo: get amount from server side, not yet implemented
        setRequest({
          creator: creatorId,
          amount: '1',
        });
      }
    };
    getCreatorData();
  }, [creatorId]);

  const makeBooking = async () => {
    const tx = await exchangeContract.newRequest(request.creator!, { value: ethers.utils.parseEther(request.amount!) });
    await tx.wait();
    const requestResult = await axios
      .post(`${API_URL}/request/create`, { ...request, txHash: tx.hash, requester: account! })
      .catch((e) => {
        console.log(e);
      });

    if (requestResult && requestResult.status === 201) {
      toast.success('Request created!');
    }
  };

  return (
    <PageWrapper>
      <HeaderSpacer />
      <HeaderContentGapSpacer />
      <PageContentWrapper>
        <PageGrid>
          <ImagesColumnContainer>
            <ImagesSlider images={creatorProfile?.demos || []} />
          </ImagesColumnContainer>
          <BookingCard>
            <FlexRow style={{ marginBottom: 30 }}>
              <div>
                <Label style={{ marginBottom: 4 }}>{creatorProfile?.userName}</Label>
                {/* todo: decide what to do with this, it's not currently included in our profile data */}
                {/* <Description>Idea instigator</Description> */}
              </div>
              <div>
                <AvatarComponent url={creatorProfile?.profilePicture} />
              </div>
            </FlexRow>
            <FlexRow style={{ marginBottom: 24 }}>
              <Description>{creatorProfile?.bio}</Description>
            </FlexRow>

            <HR style={{ marginBottom: 36 }} />

            <PurchaseOption style={{ marginBottom: 40 }}>
              <FlexRow style={{ marginBottom: 7 }}>
                <Label>Personal use</Label>
                <Label style={{ fontSize: 14 }}>{creatorProfile?.price} ether</Label>
              </FlexRow>
              <Description>Personalized video for you or someone else</Description>
            </PurchaseOption>
            <div style={{ marginBottom: 40 }}>
              <TextField
                inputStyles={{
                  width: 172,
                }}
                type="number"
                label={`Request deadline (${creatorProfile?.deliveryTime} days minimum)`}
                description={
                  'If your video isn’t delivered by your requested deadline, you will receive an automatic refund.'
                }
                endText="Days"
                onChange={(e) => setRequest({ ...request, deadline: parseInt(e) })}
                placeholder={`${(creatorProfile?.deliveryTime || 2) + 1} days`}
              />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField
                inputElementType="textarea"
                label={`Instructions for ${creatorProfile?.userName}`}
                placeholder="Say something nice..."
                onChange={(e) => setRequest({ ...request, description: e })}
              />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField label="Address to receive video NFT" placeholder="Wallet address" value={account!} />
            </div>

            <div style={{ marginBottom: 40 }}>
              <TextField
                inputStyles={{
                  width: 172,
                }}
                label="Amount to pay"
                description={'Increase your bid to get your video earlier'}
                endText="ETH"
                inputMode="numeric"
                placeholder={creatorProfile?.price}
                onChange={(e) => setRequest({ ...request, amount: e })}
              />
            </div>
            <PrimaryButton onPress={() => makeBooking()}>Book now</PrimaryButton>
          </BookingCard>
        </PageGrid>
      </PageContentWrapper>
    </PageWrapper>
  );
};

export { BookingPage };
