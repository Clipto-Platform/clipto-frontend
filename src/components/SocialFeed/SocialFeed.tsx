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

type TweetInfo = {
  description: string;
  comments: number;
  retweets: number;
  days: number;
  video: string;
};
const tweetData = [
  {
    description: 'Clipto is the future',
    comments: 10,
    retweets: 12,
    days: 7,
    video: 'https://arweave.net/BTH8PcrOZfdWuLDQwY5MDbVqrd_plGhlM1mO3RqZ17U',
  },
  {
    description: 'macro king',
    comments: 11,
    retweets: 9,
    days: 2,
    video: 'https://www.youtube.com/watch?v=Otb6cLt2i6Y',
  },
  {
    description: 'Bunny bun bun bun',
    comments: 6,
    retweets: 5,
    days: 3,
    video: '',
  },
  {
    description: 'Hello World',
    comments: 12,
    retweets: 18,
    days: 9,
    video: '',
  },
  {
    description: 'Clipto is the future',
    comments: 10,
    retweets: 12,
    days: 7,
    video: 'https://arweave.net/BTH8PcrOZfdWuLDQwY5MDbVqrd_plGhlM1mO3RqZ17U',
  },
  {
    description: '',
    comments: 11,
    retweets: 9,
    days: 2,
    video: 'https://www.youtube.com/watch?v=Otb6cLt2i6Y',
  },
  {
    description: 'Bunny bun bun bun',
    comments: 6,
    retweets: 5,
    days: 3,
    video: '',
  },
  {
    description: '',
    comments: 12,
    retweets: 18,
    days: 9,
    video: '',
  },
] as TweetInfo[];

export const SocialFeed = (props: any) => {
  const creator = props.creator;
  const loadAmount = 6;
  const [tweets, setTweets] = useState(
    tweetData.slice(0, loadAmount > tweetData.length ? tweetData.length : loadAmount),
  );
  const [hasMore, setHasMore] = useState(tweetData.length > loadAmount);

  const handleScroll = () => {
    setTimeout(() => {
      if (tweetData.length - tweets.length > loadAmount) {
        setTweets(tweetData.slice(0, tweets.length + loadAmount));
        setHasMore(true);
      } else if (tweetData.length - tweets.length >= 0 && tweetData.length - tweets.length <= loadAmount) {
        setTweets(tweetData.slice(0, tweetData.length));
        setHasMore(false);
      } else {
        console.log('error, more tweets then data exists');
      }
    }, 1500);
  };
  console.log(tweets);
  return (
    <SocialFeedWrapper>
      <InfiniteScroll
        dataLength={tweets.length}
        next={() => {
          handleScroll();
        }}
        hasMore={hasMore}
        height={730}
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
        <TwitterFeed>
          {tweets.map(({ description, comments, retweets, days, video }) => {
            return (
              <TwitterPost>
                <PostTop>
                  <PostLabel>
                    <AvatarComponent url={creator.profilePicture} size="small" twitterHandle={creator.twitterHandle} />
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
                    <Description>{days} days ago</Description>
                  </PostLabel>
                  {description != '' && (
                    <Description style={{ color: 'white', paddingTop: 20, fontWeight: 100 }}>{description}</Description>
                  )}
                  {video != '' && (
                    <>
                      <div style={{ height: 20, width: '100%' }} />
                      <Video src={video} autoplay={false} />
                    </>
                  )}
                </PostTop>
                <PostLine />
                <PostBot>
                  <Comment />
                  <PostNumbers>{comments}</PostNumbers>
                  <Retweet />
                  <PostNumbers>{retweets}</PostNumbers>
                  <Hamburger />
                </PostBot>
              </TwitterPost>
            );
          })}
        </TwitterFeed>
      </InfiniteScroll>
    </SocialFeedWrapper>
  );
};
