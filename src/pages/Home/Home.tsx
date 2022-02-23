import { useTheme } from 'styled-components';
import pfp5 from '../../assets/images/pfps/cc.png';
import pfp1 from '../../assets/images/pfps/g1.jpeg';
import pfp4 from '../../assets/images/pfps/g2.jpeg';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { User } from '../../components/UserDisplay/types';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import { HeroTitle } from './Style';

// TODO(johnrjj) - Fetch remotely
const featuredUsers: Array<User> = [
  {
    name: 'Gabriel Haines.eth',
    shortDescription: 'Protocol Designer',
    price: '10 MATIC',
    src: pfp1,
    uid: '1111',
    address: '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8',
  },
  // {
  //   name: 'Dave White',
  //   shortDescription: 'Protocol Designer',
  //   price: '100 USDC',
  //   src: pfp2,
  //   uid: '2222',
  //   address: '1',
  // },
  {
    name: 'Ape dev',
    shortDescription: 'Lead engineer',
    price: '1 MATIC',
    src: pfp4,
    uid: '4444',
    address: '0x293d9eAb4a6b6DCD263d71e74C1bD7d83Fef5063',
  },
  {
    name: 'Artemilse',
    shortDescription: 'Product designer',
    price: '5 MATIC',
    src: 'https://pbs.twimg.com/profile_images/1478236456594276355/ZZSznv7o_400x400.jpg',
    uid: '4444',
    address: '0x811AA4E4A28A80fda4F87DA8350D98E14b4959c3',
  },
  {
    name: 'jseam',
    shortDescription: 'Handy-dandy builder',
    price: '10 MATIC',
    src: 'https://pbs.twimg.com/profile_images/1478433965723643908/YY4hbFep_400x400.jpg',
    uid: '3333',
    address: '0x2632Dd0fE665F6068bf92f3524Fc61A8C49EC811',
  },
  {
    name: 'CC0maxi',
    shortDescription: 'Web3 designer',
    price: '3 MATIC',
    src: pfp5,
    uid: '5555',
    address: '0xD795A0743A105C40b4D174e7F9DbF8A60cB0Cf15',
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
