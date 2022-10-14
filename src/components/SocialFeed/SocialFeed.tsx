import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-spinners/ClipLoader';
import {
  SocialFeedWrapper,
  SocialLabel,
  TwitterFeed,
  TwitterPost,
  PostTop,
  PostBot,
  PostLabel,
  NameWrapper,
  PostLine,
  PostNumbers,
} from './Style';
import { Description, Label } from '../../styles/typography';
import { Comment, Retweet, Hamburger } from '../SocialFeedIcons';
import { AvatarComponent } from '../AvatarOrb';
import { Video } from '../Video/Video';
import * as lens from '../../api/lens';
import moment from 'moment';

type TweetInfo = {
  id: string;
  description: string;
  comments: number;
  retweets: number;
  days: number;
  videos: string[];
  images: string[];
};

export const SocialFeed = (props: any) => {
  const creator = props.creator;
  const creatorLens = props.creatorLens;
  const loadAmount = 5;
  const [tweets, setTweets] = useState<TweetInfo[]>([]);
  const [tweetLimit, setTweetLimit] = useState(loadAmount);
  const [hasMore, setHasMore] = useState(true);
  console.log(tweets[0] == null, tweets);
  async function getPosts() {
    await lens
      .getTwitterPosts({
        request: {
          publicationTypes: 'POST',
          profileId: creatorLens.id,
          limit: tweetLimit,
          sources: [],
        },
      })
      .then((tweetDatas: any) => {
        let tweets = [] as TweetInfo[];

        tweetDatas.data.publications.items.map((tweetData: any) => {
          let tempVideos = [] as string[];
          let tempImages = [] as string[];

          tweetData.metadata.media.map((media: any, index: number) => {
            //We check if video url starts with this because query gets duplicate videos with different links, duplicate videos do not start with a or i in url
            if (
              media.original.mimeType.slice(0, 5) == 'video' &&
              (media.original.url.slice(0, 9) == 'https://a' || media.original.url.slice(0, 9) == 'https://i')
            ) {
              tempVideos[index] = media.original.url;
            } else if (media.original.mimeType.slice(0, 5) == 'image') {
              tempImages[index] = media.original.url;
            }
          });
          let tweet = {
            id: tweetData.id,
            description: tweetData.metadata.content,
            comments: tweetData.stats.totalAmountOfComments,
            retweets: tweetData.stats.totalAmountOfMirrors,
            days: moment(new Date()).diff(moment(tweetData.createdAt), 'days'),
            videos: tempVideos,
            images: tempImages,
          };
          tweets.push(tweet);
        });
        setTweets(tweets);
        setTweetLimit(tweetLimit + loadAmount);
      });
  }

  useEffect(() => {
    if (tweets.length < tweetLimit - loadAmount) setHasMore(false);
  }, [tweetLimit]);

  useEffect(() => {
    if (creatorLens) getPosts();
  }, [creatorLens]);

  return (
    <SocialFeedWrapper>
      <InfiniteScroll
        dataLength={tweets.length}
        next={() => {
          getPosts();
        }}
        hasMore={hasMore}
        height={'100%'}
        style={{ flexGrow: 1, maxHeight: 730 }}
        loader={
          <div style={{ width: '100%', position: 'relative', textAlign: 'center', bottom: '-50px' }}>
            <Loader color="#fff" />
          </div>
        }
      >
        <SocialLabel>
          <div>
            <Label>Social Feed</Label>
            <Description>Most Recent</Description>
          </div>
          <AvatarComponent url={creator.profilePicture} size="small" twitterHandle={creator.twitterHandle} />
        </SocialLabel>
        {tweets[0] == null ? (
          <Description>This creator does not have any posts.</Description>
        ) : (
          <TwitterFeed>
            {tweets.map(({ id, description, comments, retweets, days, videos, images }) => {
              return (
                <TwitterPost>
                  <PostTop>
                    <PostLabel>
                      <AvatarComponent
                        url={creator.profilePicture}
                        size="small"
                        twitterHandle={creator.twitterHandle}
                      />
                      <NameWrapper>
                        <Label>{creator.userName}</Label>
                        <Description>
                          <a
                            href={`https://twitter.com/${creator.twitterH6andle}`}
                            target="_blank"
                            style={{ color: '#EDE641' }}
                          >
                            @{creator.twitterHandle}
                          </a>
                        </Description>
                      </NameWrapper>
                      <Description>
                        {days < 30
                          ? `${days} days ago`
                          : days < 365
                          ? `${Math.round(days / 30)} month${Math.round(days / 30) > 1 ? 's' : ''} ago`
                          : `${Math.round(days / 365)} year${Math.round(days / 365) > 1 ? 's' : ''} ago`}
                      </Description>
                    </PostLabel>
                    {description != '' && (
                      <Description style={{ color: 'white', paddingTop: 20, fontWeight: 100 }}>
                        {description}
                      </Description>
                    )}
                    {videos.map((video) => {
                      return (
                        <>
                          <div style={{ height: 20, width: '100%' }} />
                          <Video src={video} autoplay={false} />
                        </>
                      );
                    })}
                    {images.map((image) => {
                      return (
                        <>
                          <div style={{ height: 20, width: '100%' }} />
                          <img src={image} alt={'Lens post image'} />
                        </>
                      );
                    })}
                  </PostTop>
                  <PostLine />
                  <a href={`https://lenster.xyz/posts/${id}`} target="_blank">
                    <PostBot>
                      <Comment />
                      <PostNumbers>{comments}</PostNumbers>
                      <Retweet />
                      <PostNumbers>{retweets}</PostNumbers>
                      <Hamburger />
                    </PostBot>
                  </a>
                </TwitterPost>
              );
            })}
          </TwitterFeed>
        )}
      </InfiniteScroll>
    </SocialFeedWrapper>
  );
};
