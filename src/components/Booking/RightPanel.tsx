import styled from 'styled-components';
import { Label } from '../../styles/typography';
import { RightPanelLoading } from './RightPanelLoading';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { EntityCreator } from '../../api/types';

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
  creator?: EntityCreator;
  account?: string | null;
  loaded: boolean;
  children: (creator: EntityCreator, account: string) => React.ReactNode;
  user: any;
}

export const RightPanel: React.FC<RightPanelProps> = (props) => {
  const { creator, account, loaded, user } = props;

  return (
    <>
      {!loaded && <RightPanelLoading style={{ width: '100%' }} />}
      {loaded && !creator && <Label>Error loading creator. Try reloading the page</Label>}
      {loaded && creator && props.children(creator, account || '')}
    </>
  );
};
