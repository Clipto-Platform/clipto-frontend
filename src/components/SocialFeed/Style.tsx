import styled from 'styled-components';

export const SocialFeedWrapper = styled.div`
  width: 100%;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 30px 20px;
`;

export const SocialLabel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;
export const SocialLabelIcon = styled.img``;
export const TwitterFeed = styled.div`
  padding: 0px;
  margin-top: 20px;
`;
export const TwitterPost = styled.div`
  background-color: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  margin: 20px 0px;
`;

export const NameWrapper = styled.div`
  margin: 0px 10px;
  flex-grow: 1;
`;

export const PostTop = styled.div`
  padding: 25px;
`;
export const PostLabel = styled.div`
  display: flex;
  flex-direction: row;
`;
export const PostLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #2a2a2a;
`;
export const PostBot = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 25px;
  align-items: center;
`;
export const PostNumbers = styled.h5`
  font-family: 'Scto Grotesk A';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 17px;
  margin: 0px 14px 0px 6px;
  color: ${(props) => props.theme.lightGray};
`;
