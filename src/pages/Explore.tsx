import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
// Sample image assets
// Components
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { User, UserDisplay } from '../components/UserDisplay';
import { API_URL, SYMBOL } from '../config/config';
import * as api from '../api';

const FeaturedContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  // background-color: #0e0e0e;
`;

const ExplorePage = () => {
  const theme = useTheme();
  const limit: number = 6;
  const [users, setUsers] = useState<Array<User>>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore,setHasMore] = useState<boolean>(true);

  useEffect(() => {
    api.creators(page, limit)
      .then((res: { data: Array<any> }) => {
        const array = res.data;
        const usersArray: Array<User> = array.map((u) => {
          return {
            name: u.userName,
            shortDescription: u.twitterHandle,
            price: u.price + ' ' + SYMBOL,
            src: u.profilePicture,
            uid: u.id,
            address: u.address,
          };
        });
        setHasMore( usersArray.length % limit == 0 ? true : false );
        setUsers( [ ...users, ...usersArray ] );
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page])

  const handleScroll = () =>{
    setPage(page + 1);
  }

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
           <UserDisplay 
              title="Explore the community" 
              users={users} 
              handleScroll={handleScroll} 
              hasMore={hasMore}
            />
      </PageWrapper>
    </>
  );
};

export { ExplorePage };
