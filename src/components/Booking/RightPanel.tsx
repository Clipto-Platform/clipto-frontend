import styled from 'styled-components';
import { Creator } from '../../hooks/useCreator';
import { Label } from '../../styles/typography';
import { RightPanelLoading } from './RightPanelLoading';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const BookingCard = styled.div`
  background: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
`;

// TODO(johnrjj) - Make into Radio/RadioGroup
const PurchaseOption = styled.div`
  border: 1px solid ${(props) => props.theme.yellow};
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const HR = styled.div`
  height: 1px;
  margin-left: -24px;
  width: calc(100% + 48px);
  background-color: ${(props) => props.theme.border};
`;

export interface RightPanelProps {
  creator?: Creator;
  account?: string | null;
  loaded: boolean;
  children: (creator: Creator, account: string) => React.ReactNode;
}

export const RightPanel: React.FC<RightPanelProps> = (props) => {
  const { creator, account, loaded } = props;
  const [user, setUser] = useState();
  const getUser = useSelector((state: any) => state.user);

  useEffect(() => {
    setUser(getUser);
  }, [getUser]);

  return (
    <>
      {!loaded && <RightPanelLoading style={{ width: '100%' }} />}
      {loaded && !creator && <Label>Error loading creator</Label>}
      {loaded && !user && <Label>Please Connect your wallet</Label>}
      {loaded && creator && user && props.children(creator, account || '')}
    </>
  );
};
