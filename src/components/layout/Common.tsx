import { url } from 'inspector';
import styled from 'styled-components';
import background1 from '../../assets/images/homepage/page1/background.png';
import background2 from '../../assets/images/homepage/page2/background.png';
import background3 from '../../assets/images/homepage/page3/background.png';

import { MAX_CONTENT_WIDTH_PX } from '../../styles/theme';

export const PageWrapper = styled.div<{ blur?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding-bottom: 120px;
`;
export const BackgroundWrapper = styled.div`
  background-image: url(${(props) => (props.page === 0 ? background1 : props.page === 1 ? background2 : background3)});
  background-size: cover;
  background-color: black;
  width: 100%;
`;
export const PageContentWrapper = styled.div`
  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_CONTENT_WIDTH_PX};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const Container = styled.div`
  max-width: 512px;
  padding: 20px;
`;

export const CenterContainer = styled(Container)`
  display: block;
  margin: auto;
  margin-top: 45px;
`;
export const OutlinedContainer = styled.div`
  max-width: 512px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const FieldWrapper = styled.div`
  margin-bottom: 14px;
`;
