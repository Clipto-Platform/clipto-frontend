import styled from 'styled-components';
import { PageContentWrapper } from '../layout/Common';

export const ContainerWrapper = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 100px 0px;
`;
export const TitleWrapper = styled.h1`
  font-family: Inter-Bold;
  font-size: 32px;
`;
export const CreatorCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90vw;
  justify-content: space-around;
`;
export const CreatorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  padding: 0px 10px;
  text-align: center;
  margin-top: 100px;
`;
export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  width: 160px;
  background-color: #1a1919;
  border-radius: 50%;
  padding: 20px;
`;
export const CardTitleWrapper = styled.h2`
  color: ${(props) => props.theme.yellow};
  font-family: 'Inter-Bold';
  font-size: 24px;
  margin: 60px 0px 40px 0px;
`;
export const CardDescriptionWrapper = styled.h4`
  font-family: 'Inter-Regular';
  font-size: 20px;
`;
