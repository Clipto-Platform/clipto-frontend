import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { featuredCreators } from '../../api/index';
import { EntityCreator } from '../../api/types';
import { HeaderContentGapSpacer, HeaderSpacer } from '../../components/Header/Header';
import { ContentWrapper, PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { BackgroundWrapper } from '../../components/New/FrontPage';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';
import {
  LeftContentWrapper,
  HeroTitle,
  BookNow,
  ImageCards1,
  ImageCards2,
  ImageCards3,
  Card1,
  Card2,
  Card3,
  Left,
  Right,
  Phone1,
  Phone2,
  CryptoStar,
  Name,
  Title,
} from './Style';
import play from '../../assets/svgs/play.svg';
import { TEST } from '../../config/config';

const featuredList: string[] = [
  '0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8', // Gabriel Haines.eth
  '0x0f32c8fBD8FE29D5EF451Ed9F8a13062C00ED583', // Fedrick
  '0x8d86932d23d3766fe317b0e385fcac24806ba9a3', // Lee Eller
  '0x0c44cb8087a269e7cc1f416a9bb4d5e9fed4eb9f', // bobburnquist
  '0x1c6f1a832e73949c97fe335a98b6a5fc3c9c29e9', // mackrypto
];
const featuredListTest: string[] = [
  '0x7c98c2dec5038f00a2cbe8b7a64089f9c0b51991', // atul
  '0x8528f9805a82158c22814bda63015537a5e670c3', // rushi
  '0x7cacbc75d74740b50dc68fbf0a573af80243ca56', // jon
  '0x6e4cd1a58e0d1309da36f1ce1e456e5b93483175', // lee
];
const HomePage = () => {
  let [creators, setCreators] = useState<EntityCreator[]>([]);

  const [page, setPage] = useState<number>(0);

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

  const leftClick = () => {
    if (page == 0) {
      setPage(2);
    } else {
      setPage(page - 1);
    }
  };
  const rightClick = () => {
    if (page == 2) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const theme = useTheme();
  return (
    <>
      <PageWrapper>
        <BackgroundWrapper page={page}>
          <HeaderSpacer />
          {/* <HeaderContentGapSpacer /> */}
          <PageContentWrapper>
            {/* <ContentWrapper> */}
            {/*Arrows */}
            <Left onClick={leftClick} />
            <LeftContentWrapper>
              <HeroTitle>
                Personalized videos from your favorite{' '}
                <span style={{ color: theme.yellow, fontWeight: '700' }}>crypto stars</span>
              </HeroTitle>
              <BookNow>Book Now</BookNow>
            </LeftContentWrapper>
            {page == 0 && (
              <ImageCards1>
                <Card1>
                  <img src={play} />
                </Card1>
                <Card2>
                  <img src={play} />
                </Card2>
                <Card3>
                  <img src={play} />
                </Card3>
              </ImageCards1>
            )}
            {page == 1 && (
              <ImageCards2>
                <Phone1 />
                <Phone2 />
              </ImageCards2>
            )}
            {page == 2 && (
              <ImageCards3>
                <div style={{ zIndex: 10, maxWidth: 500 }}>
                  <Name>Bob Burnquist</Name>
                  <Title>Skateboarder</Title>
                </div>
                <CryptoStar />
              </ImageCards3>
            )}
            <Right onClick={rightClick} />
            {/* </ContentWrapper> */}
          </PageContentWrapper>
        </BackgroundWrapper>
        <UserDisplay users={creators} handleScroll={() => {}} hasMore={false} title="Featured" />
      </PageWrapper>
    </>
  );
};

export { HomePage };
