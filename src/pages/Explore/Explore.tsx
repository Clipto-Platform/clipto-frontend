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
import Loader from 'react-spinners/ClipLoader';

const ExplorePage = () => {
  const limit: number = 20;
  const [users, setUsers] = useState<EntityCreator[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { account } = useWeb3React<Web3Provider>();
  const [following, setFollowing] = useState<Array<EntityCreator>>([]); // this is who the loginned in user is following on lens
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    api.creators(page, limit).then(async (res) => {
      if (res.data) {
        const list = res.data.creators;
        const has = list.length !== 0 && list.length % limit === 0;
        //chore - create a hacked address folder or figure out where to put this
        const twitterToAddressFixes: { [twitterHandle: string]: string } = {
          bobburnquist: '0x5fa594b53817d96bcf4ff548be54b1b23579cdac',
        };
        //hotfix: remove bobs address
        for (let i = 0; i < list.length; i++) {
          let fixedAddress = twitterToAddressFixes[list[i].twitterHandle];
          if (fixedAddress) {
            let fixedCreator = await api.creatorById(fixedAddress).then(({ data, error }) => {
              if (error) {
                console.error('Creator with address 0x5fa594b53817d96bcf4ff548be54b1b23579cdac could not be found');
              }
              if (!data) return;
              return data.creator;
            });
            if (fixedCreator) list[i] = fixedCreator;
          }
        }

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
    lens.getFollowNFTs(account).then((res) => {
      if (res.error && !res.data) {
        toast.error('Unable to find who you follow');
        return;
      }
      const lensHandleOfFollow: Array<string> = res.data.following.items.map(
        (one: { profile: { handle: string; ownedBy: string } }) => one.profile.ownedBy,
      );

      api
        .findCreators(lensHandleOfFollow)
        .then((res) => {
          setFollowing(res.data?.creators);
        })
        .finally(() => {
          setLoaded(true);
        });
    });
  }, [account]);

  return (
    <>
      {loaded ? (
        <PageWrapper>
          {following.length > 0 && (
            <UserDisplay
              title="Accounts you follow"
              users={following}
              handleScroll={() => {}}
              hasMore={false}
              style={{
                marginBottom: -100,
              }}
            />
          )}
          <UserDisplay title="Explore the community" users={users} handleScroll={handleScroll} hasMore={hasMore} />
        </PageWrapper>
      ) : (
        <PageWrapper>
          <UserDisplay title="Explore the community" users={users} handleScroll={handleScroll} hasMore={hasMore} />
        </PageWrapper>
      )}
    </>
  );
};

export { ExplorePage };
