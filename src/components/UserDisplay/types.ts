import { CSSProperties } from 'react';
import { EntityCreator } from '../../api/types';

export interface User {
  name: string;
  shortDescription: string;
  price: string;
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  address: any;
}

export interface UserDisplayProps {
  title: string;
  users: Array<EntityCreator>;
  style?: CSSProperties;
  handleScroll: Function;
  hasMore: boolean;
}
