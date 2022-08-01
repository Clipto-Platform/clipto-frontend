import { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import './plyr.css';

import Plyr from 'plyr-react';

const VideoCard = styled.video`
  border-radius: 15px;
`;

interface VideoProps {
  src: string;
  autoplay?: boolean;
}

const VideoLegacy = (props: VideoProps) => {
  const src = props.src;
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    if (src) {
      setLoading(false);
    }
  }, [src]);

  return (
    <>
      {loading && (
        <ContentLoader backgroundColor="#2b2b2b" foregroundColor="#1c1c1c" viewBox="0 0 400 300" {...props}>
          <rect x="0" y="60" rx="10" ry="10" width="400" height="200" />
        </ContentLoader>
      )}
      {!loading && (
        <VideoCard
          key={key}
          src={src}
          width={600}
          controls
          autoPlay={props.autoplay != null ? props.autoplay : true}
          onError={() => {
            setKey(Math.random());
          }}
        />
      )}
    </>
  );
};

const Video: FC<VideoProps> = ({ src }) => {
  return (
    <div className="rounded-lg">
      <Plyr
        source={{
          type: 'video',
          sources: [{ src, provider: 'html5' }],
          poster: src,
        }}
        options={{
          controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
          ratio: '16:12',
        }}
      />
    </div>
  );
};

export default Video;

export { Video };
