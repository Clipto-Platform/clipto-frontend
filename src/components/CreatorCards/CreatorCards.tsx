import {
  ContainerWrapper,
  TitleWrapper,
  CreatorCard,
  CreatorCardWrapper,
  Icon,
  CardTitleWrapper,
  CardDescriptionWrapper,
} from './Style';
import Chatbox from '../../assets/images/homepage/creatorCards/chatbox.png';
import Clapperboard from '../../assets/images/homepage/creatorCards/clapperboard.png';
import Explore from '../../assets/images/homepage/creatorCards/explore.png';

const CreatorCards = () => {
  const title: Array<string> = ['Explore Creators', 'Send a request', 'Receive your NFT video!'];
  const description: Array<string> = [
    'Find your favorite creators and crypto stars',
    'Request a personalized video from creators on CLIPTO',
    'Your personalized video will be minted as a NFT and sent to the wallet you request (send your friends a surprise!)',
  ];
  const icon: Array<string> = [Explore, Chatbox, Clapperboard];
  return (
    <ContainerWrapper>
      <TitleWrapper>How CLIPTO works</TitleWrapper>
      <CreatorCardWrapper>
        {title.map((element, index) => {
          return (
            <CreatorCard key={index}>
              <Icon>
                <img src={icon[index]} />
              </Icon>
              <CardTitleWrapper>{title[index]}</CardTitleWrapper>
              <CardDescriptionWrapper>{description[index]}</CardDescriptionWrapper>
            </CreatorCard>
          );
        })}
      </CreatorCardWrapper>
    </ContainerWrapper>
  );
};
export { CreatorCards };
