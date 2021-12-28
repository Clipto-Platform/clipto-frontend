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

  if (location == null) {
    console.error(
      'NOTE(jonathanng) - If state is null, either 1) the Link props.state you clicked has a null request, 2) The props.state for Link is null or 3) you are trying to go to this page without a Link. However you should have access to the url in the format orders/:id. Code needs to be written to get the request by id from the db when state is null.',
    );
    console.error(
      'more info here: https://ui.dev/react-router-pass-props-to-link/#:~:text=To%20do%20this%20with%20React,Route%20that%20is%20being%20rendered.&text=To%20do%20this%20(and%20to,the%20user%20is%20coming%20from%20.',
    );
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
                  const verificationResult = await axios
                    .post(`${API_URL}/request/finish`, { id: location.state.request.id })
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
