import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTwitterData } from '../api';

import notfoundImage from '../assets/images/pfps/no.png';

const Image = styled.img`
  max-height: 280px;
  width: 100%;
  border-radius: 15px;
`;

export interface UserImageProps {
  src: string;
  style: CSSProperties;
  twitterHandle: string;
  onLoad: () => void;
}

export const UserImage: React.FC<UserImageProps> = (props) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'active' | 'error'>('loading');
  const [image, setImage] = useState<string>('');
  useEffect(() => {
    axios
      .get(props.src)
      .then(() => {
        setImageStatus('active');
        setImage(props.src);
      })
      .catch(() => {
        getTwitterData([props.twitterHandle])
          .then((response) => {
            const image = response.data.data[0].profile_image_url.replace('normal', '400x400');
            setImageStatus('active');
            setImage(image);
          })
          .catch(() => {
            setImageStatus('error');
            setImage(notfoundImage);
          });
      });
  }, []);
  return (
    <>
      <Image {...props} src={image} onLoad={props.onLoad} />
      {/* <LoadingUserImage {...props} /> */}
    </>
  );
};
