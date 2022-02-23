import styled from 'styled-components';

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 504px 488px;
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
  margin-bottom: 64px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  grid-template-columns: 1fr;
  width: 100%;
  grid-column-gap: 40px;
  grid-row-gap: 30px;
  max-width: 100%;
`}
`;

export const ImagesColumnContainer = styled.div`
  position: relative;
  height: auto;
  max-width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  overflow: hidden;
`}
`;

export const BookingCard = styled.div`
  background: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
`;

// TODO(johnrjj) - Make into Radio/RadioGroup
export const PurchaseOption = styled.div`
  border: 1px solid ${(props) => props.theme.yellow};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
`;

export const FlexRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;
