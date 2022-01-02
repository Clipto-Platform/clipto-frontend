import React from 'react';
import styled from 'styled-components';

import { Label, Text } from '../styles/typography';

const OrderCardContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 16px;
`;

const OrderCardTopRowContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const OrderCardBodyContainer = styled.div`
  padding-top: 24px;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

type CreatorCardStates = 'rejected' | 'past-deadline' | 'upload-clip' | 'accept-booking' | 'done';
type UserOrderCardStates = 'pending' | 'accepted' | 'cancelled' | 'done' | 'rejected';

// definitely good to implement in v2
// export interface OrderCardProps {
//   username: string;
//   address: string;
//   deadline?: Date;
//   bidAmount: string;
//   bidSymbol: string;
//   instructions: string;
//   clipData?: any;
//   action?: CreatorCardStates | UserOrderCardStates;
// }

export interface CardProps {
  title: string;
}

const SecondaryLabel = styled(Text)`
  font-weight: bold;
`;

const BidAmount = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.yellow};
`;

const Card: React.FC<CardProps> = (props) => {
  return (
    <OrderCardContainer>
      <OrderCardTopRowContainer>
        <Label>{props.title}</Label>
      </OrderCardTopRowContainer>
      <HR />
      <OrderCardBodyContainer>
        <Row>{props.children}</Row>
      </OrderCardBodyContainer>
    </OrderCardContainer>
  );
};

export { Card };
