import { useTab, useTabList, useTabPanel } from '@react-aria/tabs';
import { Item } from '@react-stately/collections';
import { TabListState, useTabListState } from '@react-stately/tabs';
import { AriaTabPanelProps, AriaTabProps, TabListProps } from '@react-types/tabs';
import React from 'react';
import styled, { CSSProperties } from 'styled-components';

/* eslint-disable @typescript-eslint/no-empty-interface */
interface ITabState {}

interface ITabListProps<T> extends TabListProps<T> {
  containerStyles?: CSSProperties;
}

function Tabs(props: ITabListProps<ITabState>) {
  const state = useTabListState(props);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <div style={{}}>
      <div
        {...tabListProps}
        ref={ref}
        style={{ display: 'flex', borderBottom: '1px solid #000000', ...props.containerStyles }}
      >
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

export interface TabProps<T> extends AriaTabProps {
  state: TabListState<T>;
  item: T & {
    key: any;
    rendered: React.ReactNode;
  };
}

const TabWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 149%;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
  cursor: pointer;

  transition: 0.15s ease;
  &:hover {
    color: #ffffff !important;
  }
`;

function Tab({ item, state }: TabProps<ITabState>) {
  const { key, rendered } = item;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { tabProps } = useTab({ key }, state, ref);
  const isSelected = state.selectedKey === key;
  const isDisabled = state.disabledKeys.has(key);
  return (
    <TabWrapper
      {...tabProps}
      ref={ref}
      style={{
        marginRight: 16,
        padding: 10,
        paddingBottom: 25,
        borderBottom: isSelected ? '2px solid #ffffff' : '2px solid transparent',
        opacity: isDisabled ? '0.5' : undefined,
        outline: 'none',
        color: isSelected ? '#ffffff' : '#888F96',
      }}
    >
      {rendered}
    </TabWrapper>
  );
}

interface TabPanelProps<T = unknown> extends AriaTabPanelProps {
  state: TabListState<T>;
  containerStyle?: CSSProperties;
}

function TabPanel({ state, ...props }: TabPanelProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref} style={{ ...props.containerStyle }}>
      {state.selectedItem?.props.children}
    </div>
  );
}

export { Item, Tabs };
