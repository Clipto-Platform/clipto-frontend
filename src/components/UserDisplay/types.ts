import { CSSProperties } from 'react';
import { EntityCreator } from '../../api/types';

export interface UserDisplayProps {
  title: string;
  users: Array<EntityCreator>;
  style?: CSSProperties;
  handleScroll: Function;
  hasMore: boolean;
}
