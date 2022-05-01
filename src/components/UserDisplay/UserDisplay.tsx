import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Loader from 'react-spinners/ClipLoader';
import { SYMBOL } from '../../config/config';
import { useImagesLoaded } from '../../hooks/useImagesLoaded';
import { formatETH } from '../../utils/format';
import { ContentWrapper } from '../layout/Common';
import { UserImage } from '../UserImage';
import {
  ContainerWrapper,
  Grid,
  Title,
  UserCardContainer,
  UserDescription,
  UserStartingPrice,
  UserTitle,
} from './Style';
import { UserDisplayProps } from './types';

const UserDisplay: React.FC<UserDisplayProps> = (props) => {
  const { users, title, style } = props;
  const { imagesDone, handleLoad } = useImagesLoaded(users.length);

  return (
    <>
      <ContainerWrapper style={{ ...style }}>
        <ContentWrapper>
          <Title style={{ marginBottom: 36 }}>{title}</Title>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {users && users.length > 0 ? (
              <Grid>
                <InfiniteScroll
                  dataLength={users.length}
                  next={() => {
                    props.handleScroll();
                  }}
                  hasMore={props.hasMore}
                  loader={
                    <div style={{ width: '100%', position: 'absolute', textAlign: 'center', bottom: '-50px' }}>
                      <Loader color="#fff" />
                    </div>
                  }
                >
                  {users.map((user) => {
                    return (
                      <Link key={user.address} to={`/creator/${user.address}`}>
                        <UserCardContainer key={user.id}>
                          <UserImage
                            src={user.profilePicture}
                            twitterHandle={user.twitterHandle}
                            onLoad={handleLoad}
                            style={{ marginBottom: 24 }}
                          />
                          <UserTitle style={{ marginBottom: 4 }}>{user.userName}</UserTitle>
                          <UserDescription style={{ marginBottom: 16 }}>{user.twitterHandle}</UserDescription>
                          <UserStartingPrice>
                            From{' '}
                            <span style={{ fontWeight: 700 }}>
                              {formatETH(user.price)} {SYMBOL}
                            </span>
                          </UserStartingPrice>
                        </UserCardContainer>
                      </Link>
                    );
                  })}
                </InfiniteScroll>
              </Grid>
            ) : (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Loader color="#fff" />
              </div>
            )}
          </div>
        </ContentWrapper>
      </ContainerWrapper>
    </>
  );
};

export { UserDisplay };
