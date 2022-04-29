import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { featuredCreators } from '../../api/index';
import { EntityCreator } from '../../api/types';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import Slides from '../../components/Slides/Slides';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import { CreatorCards } from '../../components/CreatorCards/CreatorCards';
import * as api from '../../api';
import { TEST } from '../../config/config';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { UserProfile } from '../../hooks/useProfile';

const featuredList: string[] = [
  '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8', // Gabriel Haines.eth
  '0x0f32c8fBD8FE29D5EF451Ed9F8a13062C00ED583', // Fedrick
  '0x8d86932d23d3766fe317b0e385fcac24806ba9a3', // Lee Eller
  '0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f', // bobburnquist
  '0x1c6f1a832e73949c97fe335a98b6a5fc3c9c29e9', // mackrypto
];
const featuredListTest: string[] = [
  '0x7c98c2dec5038f00a2cbe8b7a64089f9c0b51991', // atul
  '0x8b2a6a22ec055225C4c4b5815e7d9F566b8be68F', // rushi
  '0x7cacbc75d74740b50dc68fbf0a573af80243ca56', // jon
  '0x6e4cd1a58e0d1309da36f1ce1e456e5b93483175', // lee
];

const HomePage = () => {
  let [creators, setCreators] = useState<EntityCreator[]>([]);

  const [creator, setCreator] = useState<Partial<UserProfile> | null>();
  const { account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const getCreatorData = async () => {
      if (account) {
        try {
          const response = await api.creatorById(account || '');
          if (response.data && response.data.creator) {
            setCreator(response.data.creator);
          }
        } catch (e) {
          setCreator(null);
        }
      }
    };
    getCreatorData();
  }, [account]);

  useEffect(() => {
    const creatorAddresses = TEST
      ? featuredListTest.map((c) => c.toLowerCase())
      : featuredList.map((c) => c.toLowerCase());

    featuredCreators(creatorAddresses).then((response) => {
      if (response.data) {
        const sorted = response.data.creators.sort((a, b) => {
          return creatorAddresses.indexOf(a.address.toLowerCase()) - creatorAddresses.indexOf(b.address.toLowerCase());
        });
        setCreators(sorted);
      }
    });
  });

  const theme = useTheme();
  return (
    <>
      <PageWrapper style={{ top: 0 }}>
        <Slides />
        <UserDisplay users={creators} handleScroll={() => {}} hasMore={false} title="Featured" />
        <CreatorCards />
      </PageWrapper>
    </>
  );
};

export { HomePage };
