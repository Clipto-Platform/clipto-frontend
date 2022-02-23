import styled from 'styled-components';
import { PageContentWrapper } from '../../components/layout/Common';
import { Text } from '../../styles/typography';

export const Status = styled.div`
  width: 90px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.1); //TODO(jonathanng) - color don't be lazy
  font-family: 'Scto Grotesk A';
  border-radius: 40px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4); //TODO(jonathanng) - color don't be lazy
`;

export const HighlightText = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;

export const TabContent = styled.div`
  margin-top: 48px;
`;

export const SingleColumnPageContent = styled(PageContentWrapper)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
