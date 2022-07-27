import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

const VideoCard = styled.video`
  border-radius: 15px;
`;

interface VideoProps {
  src: string;
  autoplay?: boolean;
}

const Video = (props: VideoProps) => {
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

export { Video };
