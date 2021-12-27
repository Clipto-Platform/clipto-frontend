import styled from 'styled-components';

import { MAX_CONTENT_WIDTH_PX } from '../../styles/theme';

export const PageWrapper = styled.div<{ blur?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const PageContentWrapper = styled.div`
  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}
  width: 100%;
  display: flex;
  justify-content: center;
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

export const OutlinedContainer = styled.div`
  max-width: 512px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const FieldWrapper = styled.div`
  margin-bottom: 14px;
`;
