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
  },
  {
    id: "0x8d86932d23d3766fe317b0e385fcac24806ba9a3",
    address: "0x8d86932d23d3766fe317b0e385fcac24806ba9a3",
    tokenAddress: "0x24faa0808c01f520ce218a781ef8a1c2511d44b2",
    twitterHandle: "MotherOfDegens_",
    bio: "I am your mother.  I will put you in your place, but I will also feed you from my teet.",
    deliveryTime: 3,
    demos: [
      "https://twitter.com/MotherOfDegens_/status/1482810237304381442?s=20&t=_6AHcfX7sDr77O8U6xi-xg"
    ],
    profilePicture: "https://pbs.twimg.com/profile_images/1507089304065085444/ukKBFEcZ_400x400.jpg",
    userName: "Lee Eller",
    price: 50,
    txHash: "0x21d8cf85ab1aba976405bc4a09a238ed6c05181de484a221bc7d78f35a1f429d",
    block: 26346388,
    timestamp: 1648213830
  },
  {
    id: "0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f",
    userName: "@bobburnquist",
    twitterHandle: "bobburnquist",
    price: 76,
    profilePicture: "https://pbs.twimg.com/profile_images/1507189906300416007/Oe7aCvpU_400x400.jpg",
    address: "0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f",
    bio: "1-12345 67 {8ϕ8} 76 54321-0\n",
    demos: [
      "https://twitter.com/mysselium/status/1474400734892359680?s=20",
      "https://twitter.com/bobburnquist/status/1508180005939032067?s=20&t=0moECwFL7cK49WxtyHTN7w"
    ],
    timestamp: 1647999900,
    tokenAddress: "0x5c840dc3761e0e580cab3b836578ea3b6f80a33f",
    txHash: "0x654ac4bc4d30e2b4d08429453d99bc413eaa5055a15452922c65503822129d61",
    deliveryTime: 3,
    block: 26248799
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
