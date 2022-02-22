import { CSSProperties } from 'react';

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
  users: Array<User>;
  style?: CSSProperties;
  handleScroll: Function;
  hasMore: boolean;
}
