import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

// Sample image assets
// Components
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { User, UserDisplay } from '../components/UserDisplay';
import { API_URL } from '../config/config';

import { SYMBOL } from '../config/config';
const FeaturedContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  // background-color: #0e0e0e;
`;
const ExplorePage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<Array<User>>([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((res: { data: Array<any> }) => {
        const array = res.data.reverse();
        const users: Array<User> = array.map((u) => {
          return {
            name: u.userName,
            shortDescription: u.twitterHandle,
            price: u.price + ' ' + SYMBOL,
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
