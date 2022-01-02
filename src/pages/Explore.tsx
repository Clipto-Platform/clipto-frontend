import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

// Sample image assets
// Components
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { User, UserDisplay } from '../components/UserDisplay';
import { API_URL } from '../config/config';

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
  const [users, setUsers] = useState<Array<User>>([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((res: { data: Array<any> }) => {
        const array = res.data.reverse()
        const users: Array<User> = array.map((u) => {
          return {
            name: u.userName,
            shortDescription: u.twitterHandle,
            price: u.price + ' ETH',
            src: u.profilePicture,
            uid: u.id,
            address: u.address,
          };
        });
        setUsers(users);
        console.log('Fetched users!');
      })
      .catch((e) => {
        console.error(e);
        console.error('Error fetching users!');
      });
  }, []);
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <FeaturedContainerWrapper>
          <ContentWrapper>
            <UserDisplay title="Explore the community" users={users} />
          </ContentWrapper>
        </FeaturedContainerWrapper>
      </PageWrapper>
    </>
  );
};

export { ExplorePage };
