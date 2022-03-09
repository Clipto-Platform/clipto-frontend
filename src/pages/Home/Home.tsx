import { useTheme } from 'styled-components';
import { EntityCreator } from '../../api/types';
import pfp5 from '../../assets/images/pfps/cc.png';
import pfp1 from '../../assets/images/pfps/g1.jpeg';
import pfp4 from '../../assets/images/pfps/g2.jpeg';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import { HeroTitle } from './Style';

// TODO(johnrjj) - Fetch remotely
const featuredUsers: EntityCreator[] = [
  {
    userName: 'Gabriel Haines.eth',
    twitterHandle: 'Protocol Designer',
    price: 10,
    profilePicture: pfp1,
    address: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    id: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 12,
    block: 0
  },
  // {
  //   name: 'Dave White',
  //   twitterHandle: 'Protocol Designer',
  //   price: '100 USDC',
  //   profilePicture: pfp2,
  //   uid: '2222',
  //   address: '1',
  // },
  {
    userName: 'Ape dev',
    twitterHandle: 'Lead engineer',
    price: 1,
    profilePicture: pfp4,
    address: '0x293d9eAb4a6b6DCD263d71e74C1bD7d83Fef5063',
    id: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 12,
    block: 0,
  },
  {
    userName: 'Artemilse',
    twitterHandle: 'Product designer',
    price: 5,
    profilePicture: 'https://pbs.twimg.com/profile_images/1478236456594276355/ZZSznv7o_400x400.jpg',
    address: '0x811AA4E4A28A80fda4F87DA8350D98E14b4959c3',
    id: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 12,
    block: 0
  },
  {
    userName: 'jseam',
    twitterHandle: 'Handy-dandy builder',
    price: 10,
    profilePicture: 'https://pbs.twimg.com/profile_images/1478433965723643908/YY4hbFep_400x400.jpg',
    address: '0x2632Dd0fE665F6068bf92f3524Fc61A8C49EC811',
    id: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 12,
    block: 0
  },
  {
    userName: 'CC0maxi',
    twitterHandle: 'Web3 designer',
    price: 3,
    profilePicture: pfp5,
    address: '0xD795A0743A105C40b4D174e7F9DbF8A60cB0Cf15',
    id: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 12,
    block: 0
  },
];

const HomePage = () => {
  const theme = useTheme();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <HeroTitle>
              Personalized videos from your favorite{' '}
              <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
            </HeroTitle>
          </ContentWrapper>
        </PageContentWrapper>
        <UserDisplay users={featuredUsers} handleScroll={() => {}} hasMore={false} title="Featured" />
      </PageWrapper>
    </>
  );
};

export { HomePage };
