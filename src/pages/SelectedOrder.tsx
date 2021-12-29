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
import { colors } from '../styles/theme';
import { Description, Label } from '../styles/typography';

import { useExchangeContract, useNFTContract } from '../hooks/useContracts';
import { useProfile } from '../hooks/useProfile';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
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
  const nftExchange = useNFTContract('0x7d704f6B7Ed4abF6572979Ab667bE5A0626174Bb', true)
  if (location == null) {
    console.error(
      'NOTE(jonathanng) - If state is null, either 1) the Link props.state you clicked has a null request, 2) The props.state for Link is null or 3) you are trying to go to this page without a Link. However you should have access to the url in the format orders/:id. Code needs to be written to get the request by id from the db when state is null.',
    );
    console.error(
      'more info here: https://ui.dev/react-router-pass-props-to-link/#:~:text=To%20do%20this%20with%20React,Route%20that%20is%20being%20rendered.&text=To%20do%20this%20(and%20to,the%20user%20is%20coming%20from%20.',
    );
  }

  useEffect(async () => {
    const creator = location.state.request.creator;
    const index = location.state.request.requestId;
    console.log(location)
    console.log(index)
    exchangeContract.requests(creator, index).then((e) => {
      console.log('hi')
      console.log(e)
    })

    const cliptoTokenContract = await exchangeContract.creators(creator);
    console.log(cliptoTokenContract)
    const f = await nftExchange.balanceOf(account)
    console.log(f)
    console.log('^^^')
    // exchangeContract.on("Transfer", (address, to, tokenId) => {
    //   console.log('transfer event emitted')
    //   console.log(address)
    //   console.log(to)
    //   console.log(tokenId)
    // })
    const ex = [
      "0x4e78d8b8F17443dF9b92f07fd322d1aB1DA91365",
      {
        "type": "BigNumber",
        "hex": "0x06f05b59d3b20000"
      },
      false
    ]
  })
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
                  const id = location.state.request.id;
                  console.log(account)
                  //TODO(jonathanng) - get actual request
                  const req = await exchangeContract.deliverRequest(location.state.request.requestId, pfp)
                  console.log('req')
                  console.log(req)
                  const verificationResult = await axios
                    .post(`${API_URL}/request/finish`, { id: id })
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
