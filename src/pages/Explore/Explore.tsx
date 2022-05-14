import { useEffect, useState } from 'react';
import * as api from '../../api';
import { EntityCreator } from '../../api/types';
import { HeaderSpacer } from '../../components/Header/Header';
import { PageWrapper } from '../../components/layout/Common';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import * as lens from '../../api/lens';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { toast } from 'react-toastify';

const ExplorePage = () => {
  const limit: number = 20;
  const [users, setUsers] = useState<EntityCreator[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { account } = useWeb3React<Web3Provider>();
  const [following, setFollowing] = useState<Array<EntityCreator>>([]); // this is who the loginned in user is following on lens
  useEffect(() => {
    api.creators(page, limit).then((res) => {
      if (res.data) {
        const list = res.data.creators;
        const has = list.length !== 0 && list.length % limit === 0;

        setHasMore(has);
        setUsers([...users, ...list]);
      }
    });
  }, [page]);

  const handleScroll = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (!account) return;
    lens.getFollowNFTs(account).then(res => {
      console.log(res)
      if (res.error && !res.data) {
        toast.error('Unable to find who you follow');
        return;
      }
      const lensHandleOfFollow : Array<string> = res.data.following.items.map((one : {profile: {handle: string}}) => one.profile.handle);
      api.creatorsByLens(lensHandleOfFollow).then(res => {
        if (!res.data) return;
        setFollowing(res.data?.creators)
      })
      
    })
  }, [account]);
  return (
    <>
      <PageWrapper>
        {following.length > 0 && <UserDisplay title="Your Favorites" users={following} handleScroll={()=>{}} hasMore={false} style={{
          marginBottom: -100
        }} />}
        <UserDisplay title="Explore the community" users={users} handleScroll={handleScroll} hasMore={hasMore} />
      </PageWrapper>
    </>
  );
};

export { ExplorePage };
