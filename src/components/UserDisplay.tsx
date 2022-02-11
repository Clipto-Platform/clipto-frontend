import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContentWrapper, PageContentWrapper } from '../components/layout/Common';
import { SYMBOL } from '../config/config';
import { useImagesLoaded } from '../hooks/useImagesLoaded';
import { formatETH } from '../utils/format';
import { UserImage } from './UserImage';


export interface User {
  name: string;
  shortDescription: string;
  price: string;
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  address: any;
}

const ContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  // background-color: #0e0e0e;
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

const Title = styled.h2`
  font-family: 'Scto Grotesk A';
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
`;

const Grid = styled.div`
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

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const UserTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const UserDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.lightGray};
`;

const UserStartingPrice = styled.div``;

interface UserDisplayProps {
  title: string;
  users: Array<User>;
  style?: CSSProperties;
}

const UserDisplay: React.FC<UserDisplayProps> = (props) => {
  const { users, title, style } = props;
  const { imagesDone, handleLoad } = useImagesLoaded(users.length);

  return (
    <>
      <ContainerWrapper style={{ ...style }}>
        <ContentWrapper>
          <Title style={{ marginTop: 64, marginBottom: 36 }}>{title}</Title>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Grid>
              {users.map((user) => {
                return (
                  <Link key={user.address} to={`/creator/${user.address}`}>
                    <UserCardContainer key={user.uid}>
                      <UserImage src={user.src} onLoad={handleLoad} style={{ marginBottom: 24 }} />
                      {imagesDone && (
                        <>
                          <UserTitle style={{ marginBottom: 4 }}>{user.name}</UserTitle>
                          <UserDescription style={{ marginBottom: 16 }}>{user.shortDescription}</UserDescription>
                          <UserStartingPrice>
                            From{' '}
                            <span style={{ fontWeight: 700 }}>
                              {formatETH(parseFloat(user.price))} {SYMBOL}
                            </span>
                          </UserStartingPrice>
                        </>
                      )}
                    </UserCardContainer>
                  </Link>
                );
              })}
            </Grid>
          </div>
        </ContentWrapper>
      </ContainerWrapper>
    </>
  );
};

export { UserDisplay };
