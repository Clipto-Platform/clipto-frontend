import { useEffect, useState } from 'react';
import * as api from '../api';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageWrapper } from '../components/layout/Common';
import { User, UserDisplay } from '../components/UserDisplay';
import { SYMBOL } from '../config/config';

const ExplorePage = () => {
  const limit: number = 20;
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    api
      .creators(page, limit)
      .then((res: { data: any[] }) => {
        const array = res.data;
        const usersArray: User[] = array.map((u) => {
          return {
            name: u.userName,
            shortDescription: u.twitterHandle,
            price: u.price + ' ' + SYMBOL,
            src: u.profilePicture,
            uid: u.id,
            address: u.address,
          };
        });
        const has = usersArray.length !== 0 && usersArray.length % limit === 0;
        setHasMore(has);
        setUsers([...users, ...usersArray]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleScroll = () => {
    setPage(page + 1);
  };

  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <UserDisplay title="Explore the community" users={users} handleScroll={handleScroll} hasMore={hasMore} />
      </PageWrapper>
    </>
  );
};

export { ExplorePage };
