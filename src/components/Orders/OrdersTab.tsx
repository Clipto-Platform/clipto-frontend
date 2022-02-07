import styled from 'styled-components';

import { Label } from '../../styles/typography';

export type Request = {
  id: number;
  requestId: number;
  requester: string;
  creator: string;
  amount: string;
  description: string;
  deadline: number;
  delivered: boolean;
  txHash: string;
  created: string;
  refunded:boolean;
};

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
}
`;

const TabContent = styled.div`
  margin-top: 48px;
`;

export interface OrdersTabProps {
  FallbackWhenNoRequests: () => JSX.Element;
  requests: Request[];
  loaded: boolean;
  children: (requests: Request[]) => React.ReactNode;
}

export const OrdersTab: React.FC<OrdersTabProps> = (props) => {
  const { FallbackWhenNoRequests, requests, loaded } = props;
  return (
    <TabContent>
      {!loaded && <Label>Loading Animation here</Label>}
      {loaded && requests.length === 0 && <FallbackWhenNoRequests />}
      {loaded && requests.length !== 0 && props.children(requests)}
    </TabContent>
  );
};
