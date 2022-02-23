import styled from 'styled-components';
import { Text } from '../../styles/typography';

export const OrderCardContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 16px;
`;

export const OrderCardTopRowContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const OrderCardBodyContainer = styled.div`
  padding-top: 24px;
`;

export const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const WideContainer = styled(Row)`
  @media screen and (max-width: 480px) {
    justify-content: space-between;
    margin-top: 15px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AvatarContainer = styled.div`
  margin-right: 16px;
`;

export const SecondaryLabel = styled(Text)`
  font-weight: bold;
`;

export const BidAmount = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;
