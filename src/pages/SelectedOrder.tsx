import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { AvatarOrb } from '../components/AvatarOrb';
import { PrimaryButton } from '../components/Button';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ImagesSlider } from '../components/ImagesSlider';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { colors } from '../styles/theme';
import { Description, Label } from '../styles/typography';

const BookingCard = styled.div`
  background: ${(props) => props.theme.lessDarkGray};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
  height:512px;
  border: 2.5px dashed #2A2A2A;
  box-sizing: border-box;
  border-radius: 16px;
`;


const SelectedOrderPage = () => {

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
          <BookingCard style={{ textAlign: 'center', display: 'flex', marginBottom: 24 }}>
            <div style={{ margin: 'auto' }}>
              <div style={{}}>
                {/** TODO(jonathanng) - Text size is off */}
                <Label>
                  Upload clip
                </Label>
              </div>
              <div>
                <Description>
                  Drag and drop an mp4 or select a file to upload
                </Description>
              </div>
              {/** TODO(jonathanng) - colors off */}
              <PrimaryButton variant='secondary' size='small' style={{ color: colors.white, width: 120, margin: 'auto' }}>
                Select file
              </PrimaryButton>
            </div>
          </BookingCard>
          <OrderCard request={{
            "id": 2,
            "requester": "0x2d5FbE94e37E3EaC600E0eD510795597cF6900D3",
            "creator": "0x2d5FbE94e37E3EaC600E0eD510795597cF6900D3",
            "amount": "1",
            "description": "2nd transaction",
            "deadline": 5,
            "delivered": false,
            "txHash": "0x44cd77c701160a776231ae963ace266d5be21294178c7ce3254b3cb24295ef18",
            "created": "2021-12-26T22:49:40.293Z"
          }} key={1} />
        </PageContentWrapper>
      </PageWrapper >
    </>
  );
};

export { SelectedOrderPage };