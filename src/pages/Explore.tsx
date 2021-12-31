import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import axios from 'axios'
// Sample image assets
import pfp1 from '../assets/images/pfps/1.png';
import pfp2 from '../assets/images/pfps/2.png';
import pfp3 from '../assets/images/pfps/3.png';
import pfp4 from '../assets/images/pfps/4.png';
import pfp5 from '../assets/images/pfps/5.png';
// Components
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { API_URL } from '../config/config';
import { toast } from 'react-toastify';

interface User {
  name: string;
  shortDescription: string;
  price: string;
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  address: any;
}

const FeaturedContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  // background-color: #0e0e0e;
`;

const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 36px;
  `}
`;

const FeaturedTitle = styled.h2`
  font-family: 'Scto Grotesk A';
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${({ theme }) => theme.mediaWidth.upToSmall`
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
  `}
  grid-template-rows: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
`;

const FeaturedUserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FeaturedUserImage = styled.img`
  max-height: 280px;
  width: 100%;
`;

const FeaturedUserTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const FeaturedUserDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.lightGray};
`;

const FeaturedUserStartingPrice = styled.div``;

const ExplorePage = () => {
  const theme = useTheme();
  const [featuredUsers, setFeaturedUsers] = useState<Array<User>>([]);
  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then((res: { data: Array<any> }) => {
        const users: Array<User> = res.data.map(u => {
          return {
            name: u.userName,
            shortDescription: u.twitterHandle,
            price: '100 USDC',
            src: u.profilePicture,
            uid: u.id,
            address: u.address
          }
        })
        setFeaturedUsers(users)
        console.log('Fetched users!');
      })
      .catch((e) => {
        console.error(e);
        console.error('Error fetching users!');
      });
  }, [])
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <FeaturedContainerWrapper>
          <ContentWrapper>
            <FeaturedTitle style={{ marginTop: 64, marginBottom: 36 }}>Explore the community</FeaturedTitle>
            <FeaturedGrid>
              {featuredUsers.map((user) => {
                return (
                  <Link key={user.address} to={`/creator/${user.address}`}>
                    <FeaturedUserCardContainer key={user.uid}>
                      <FeaturedUserImage src={user.src} style={{ marginBottom: 24 }} />
                      <FeaturedUserTitle style={{ marginBottom: 4 }}>{user.name}</FeaturedUserTitle>
                      <FeaturedUserDescription style={{ marginBottom: 16 }}>
                        {user.shortDescription}
                      </FeaturedUserDescription>
                      <FeaturedUserStartingPrice>
                        From <span style={{ fontWeight: 700 }}>{user.price}</span>
                      </FeaturedUserStartingPrice>
                    </FeaturedUserCardContainer>
                  </Link>
                );
              })}
            </FeaturedGrid>
          </ContentWrapper>
        </FeaturedContainerWrapper>
      </PageWrapper>
    </>
  );
};

export { ExplorePage };
