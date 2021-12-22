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

interface FeaturedUser {
  name: string;
  shortDescription: string;
  price: string;
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
}

// TODO(johnrjj) - Fetch remotely
const featuredUsers: Array<FeaturedUser> = [
  {
    name: 'Gabriel Haines',
    shortDescription: 'Idea instigator',
    price: '100 USDC',
    src: pfp1,
    uid: '1111',
  },
  {
    name: 'Dave White',
    shortDescription: 'Protocol Designer',
    price: '100 USDC',
    src: pfp2,
    uid: '2222',
  },
  {
    name: 'jseam',
    shortDescription: 'Handy-dandy builder',
    price: '100 USDC',
    src: pfp3,
    uid: '3333',
  },
  {
    name: 'Artemilse',
    shortDescription: 'Product designer',
    price: '100 USDC',
    src: pfp4,
    uid: '4444',
  },
  {
    name: 'CC0maxi',
    shortDescription: 'Web3 designer',
    price: '100 USDC',
    src: pfp5,
    uid: '5555',
  },
];

const FeaturedContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: #0e0e0e;
`;

const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 36px;
  `}
`;

const FeaturedTitle = styled.h2`
  font-family: 'Scto Grotesk A';
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${({ theme }) => theme.mediaWidth.upToSmall`
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
  `}
  grid-template-rows: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
`;

const FeaturedUserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FeaturedUserImage = styled.img`
  max-height: 280px;
  width: 100%;
`;

const FeaturedUserTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const FeaturedUserDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.lightGray};
`;

const FeaturedUserStartingPrice = styled.div``;

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
        <FeaturedContainerWrapper>
          <ContentWrapper>
            <FeaturedTitle style={{ marginTop: 64, marginBottom: 36 }}>Featured</FeaturedTitle>
            <FeaturedGrid>
              {featuredUsers.map((user) => {
                return (
                  <Link key={user.uid} to={`/${user.uid}`}>
                    <FeaturedUserCardContainer key={user.uid}>
                      <FeaturedUserImage src={user.src} style={{ marginBottom: 24 }} />
                      <FeaturedUserTitle style={{ marginBottom: 4 }}>{user.name}</FeaturedUserTitle>
                      <FeaturedUserDescription style={{ marginBottom: 16 }}>
                        {user.shortDescription}
                      </FeaturedUserDescription>
                      <FeaturedUserStartingPrice>
                        From <span style={{ fontWeight: 700 }}>{user.price}</span>
                      </FeaturedUserStartingPrice>
                    </FeaturedUserCardContainer>
                  </Link>
                );
              })}
            </FeaturedGrid>
          </ContentWrapper>
        </FeaturedContainerWrapper>
      </PageWrapper>
    </>
  );
};

export { HomePage };
