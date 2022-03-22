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
    twitterHandle: 'He yells',
    price: 100,
    profilePicture: 'https://pbs.twimg.com/profile_images/1502335466120560644/jwKWZhg5_400x400.jpg',
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
  {
    userName: 'Frederic van Strydonck',
    twitterHandle: 'fvanstry',
    price: 500,
    profilePicture: 'https://pbs.twimg.com/profile_images/1425546248367529991/OtLkkJ6U_400x400.jpg',
    address: '0x0f32c8fBD8FE29D5EF451Ed9F8a13062C00ED583',
    id: '0x0f32c8fbd8fe29d5ef451ed9f8a13062c00ed583',
    bio: '',
    demos: [],
    timestamp: 0,
    tokenAddress: '',
    txHash: '',
    deliveryTime: 7,
    block: 0
  }
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
