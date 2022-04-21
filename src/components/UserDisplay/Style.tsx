import styled from 'styled-components';
import { PageContentWrapper } from '../layout/Common';

export const ContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: rgb(10, 10, 10);
  padding: 80px 0px;
`;

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 36px;
  `}
`;

export const Title = styled.h2`
  font-family: 'Scto Grotesk A';
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
`;

export const Grid = styled.div`
  & .infinite-scroll-component {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  `}
    ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  `}
  grid-template-rows: 1fr;
    grid-column-gap: 32px;
    grid-row-gap: 32px;
  }
`;

export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const UserTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

export const UserDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.lightGray};
`;

export const UserStartingPrice = styled.div``;
