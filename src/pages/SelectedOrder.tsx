import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { AvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { API_URL } from '../config/config';
import { useExchangeContract, useNFTContract } from '../hooks/useContracts';
import { useProfile } from '../hooks/useProfile';
import { colors } from '../styles/theme';
import { Description, Label } from '../styles/typography';
import { CreateRequestDto } from './Booking';
const BookingCard = styled.div`
  background: ${(props) => props.theme.lessDarkGray};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
  height: 512px;
  border: 2.5px dashed #2a2a2a;
  box-sizing: border-box;
  border-radius: 16px;
`;

const ImageCardContainer = styled.div`
  object-fit: fill;
  border-radius: 16px;
  :not(:last-child) {
    margin-right: 24px;
  }
`;

const ImageCardImg = styled.img`
  object-fit: fill;
  user-select: none;
`;

const SelectedOrderPage = (props: any) => {
  const [upload, setUpload] = useState('');
  const [done, setDone] = useState(false);
  const location = useLocation();
  const userProfile = useProfile();
  const { account } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const { creator, requestId } = useParams();
  const [request, setRequest] = useState<CreateRequestDto>();

  useEffect(() => {
    // const creator = location?.state!.request.creator;
    // const requestId = location.state.request.requestId;
    exchangeContract.requests(creator!, requestId!).then((e) => {
      axios.get(`${API_URL}/request/creator/${creator}/${requestId}`).then(res => {
        setRequest(res.data)
      }).catch(console.error)
    });
  }, []);
  if (request && request.delivered || done) {
    return (
      <>
        <PageWrapper>
          <HeaderSpacer />
          <HeaderContentGapSpacer />
          <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
            <Label>Request is delivered or refunded</Label>
          </PageContentWrapper>
        </PageWrapper>
      </>
    )
  }
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
          <BookingCard style={{ textAlign: 'center', display: 'flex', marginBottom: 24 }}>
            {!upload && (
              <div style={{ margin: 'auto' }}>
                <div style={{}}>
                  {/** TODO(jonathanng) - Text size is off */}
                  <Label>Upload clip</Label>
                </div>
                <div>
                  <Description>Drag and drop an mp4 or select a file to upload</Description>
                </div>
                {/** TODO(jonathanng) - colors off */}
                <PrimaryButton
                  variant="secondary"
                  size="small"
                  style={{ color: colors.white, width: 120, margin: 'auto' }}
                  onPress={() => {
                    setUpload(pfp);
                  }}
                >
                  Select file
                </PrimaryButton>
              </div>
            )}

            {upload && (
              <ImageCardContainer style={{ margin: 'auto' }}>
                <ImageCardImg src={pfp} />
              </ImageCardContainer>
            )}
          </BookingCard>
          {upload && !done && (
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <PrimaryButton
                onPress={async () => {
                  // const id = location.state.request.id;
                  // console.log(account);
                  //TODO(jonathanng) - get actual request
                  if (!request) {
                    toast.error('Request not found. Try reloading the page...')
                    return;
                  }
                  const tx = await exchangeContract.deliverRequest(parseInt(requestId!), pfp);
                  const receipt = await tx.wait()
                  const verificationResult = await axios
                    .post(`${API_URL}/request/finish`, { id: request.id })
                    .then(() => {
                      toast.success('Successfully completed order!');
                      setDone(true);
                    })
                    .catch((e) => {
                      console.log(e);
                      toast.error('Failed to mint NFT!');
                    });
                }}
                size="small"
                style={{ marginRight: 20 }}
              >
                Mint and send NFT
              </PrimaryButton>
              <PrimaryButton size="small" variant="secondary" onPress={() => setUpload('')}>
                New upload
              </PrimaryButton>
            </div>
          )}
          <OrderCard
            //NOTE(jonathanng) - typescript problems...
            request={location.state.request}
            key={1}
          />
          {done && (
            <>
              <Card title="History"></Card>
              <Card title="NFT Details"></Card>
            </>
          )}
        </PageContentWrapper>
      </PageWrapper>
    </>
  );
};

export { SelectedOrderPage };
