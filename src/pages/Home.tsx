import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

// Sample image assets
import pfp1 from '../assets/images/pfps/1.png';
import pfp2 from '../assets/images/pfps/2.png';
import pfp3 from '../assets/images/pfps/3.png';
import pfp4 from '../assets/images/pfps/4.png';
import pfp5 from '../assets/images/pfps/5.png';
// Components
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { User, UserDisplay } from '../components/UserDisplay';

// TODO(johnrjj) - Fetch remotely
const featuredUsers: Array<User> = [
  {
    name: 'Gabriel Haines',
    shortDescription: 'Idea instigator',
    price: '100 USDC',
    src: pfp1,
    uid: '1111',
    address: '1',
  },
  {
    name: 'Dave White',
    shortDescription: 'Protocol Designer',
    price: '100 USDC',
    src: pfp2,
    uid: '2222',
    address: '1',
  },
  {
    name: 'jseam',
    shortDescription: 'Handy-dandy builder',
    price: '100 USDC',
    src: pfp3,
    uid: '3333',
    address: '1',
  },
  {
    name: 'Artemilse',
    shortDescription: 'Product designer',
    price: '100 USDC',
    src: pfp4,
    uid: '4444',
    address: '1',
  },
  {
    name: 'CC0maxi',
    shortDescription: 'Web3 designer',
    price: '100 USDC',
    src: pfp5,
    uid: '5555',
    address: '1',
  },
];

const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 36px;
  `}
`;

const HomePage = () => {
  const theme = useTheme();
  return (
    <>
      <PageWrapper>
        <HeaderSpacer />
        <HeaderContentGapSpacer />
        <PageContentWrapper>
          <ContentWrapper>
            <HeroTitle style={{ marginBottom: 100, maxWidth: 600 }}>
              Personalized videos from your favorite{' '}
              <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
            </HeroTitle>
          </ContentWrapper>
        </PageContentWrapper>
        <UserDisplay users={featuredUsers} title="Featured" style={{ marginBottom: 40 }} />
      </PageWrapper>
    </>
  );
};

export { HomePage };
