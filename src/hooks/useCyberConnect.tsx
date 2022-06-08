import { useCallback, useEffect, useState } from 'react';
import CyberConnect, { ConnectionType, Env } from '@cyberlab/cyberconnect';
import { useWeb3React } from '@web3-react/core';
import type { Web3Provider } from '@ethersproject/providers';
import { twitterAuthorize, twitterVerify, githubAuthorize, githubVerify } from '@cyberlab/social-verifier';
import { createClient } from 'urql';
import config from '../config/config';
import * as query from '../api/query';
import * as type from '../api/types';

const graphInstance = createClient({ url: config.cyberConnectGraphApi });

export const useCyberConnect = () => {
  const [cyberConncet, setCyberConnect] = useState<CyberConnect>();
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (account && library) {
      const cc = new CyberConnect({
        namespace: 'Clipto',
        provider: library,
        signingMessageEntity: 'Clipto',
        env: import.meta.env.VITE_APP_ENV === 'production' ? Env.PRODUCTION : Env.STAGING,
      });

      setCyberConnect(cc);
    }
  }, [library, account]);

  const follow = useCallback(
    async (address: string, alias?: string, connectionType?: ConnectionType) => {
      if (cyberConncet) {
        await cyberConncet.connect(address, alias, connectionType);
      }
    },
    [cyberConncet],
  );

  const unfollow = useCallback(
    async (address: string) => {
      if (cyberConncet) {
        await cyberConncet.disconnect(address);
      }
    },
    [cyberConncet],
  );

  const batchFollow = useCallback(
    async (addresses: string[], connectionType?: ConnectionType) => {
      if (cyberConncet) {
        await cyberConncet.batchConnect(addresses, connectionType);
      }
    },
    [cyberConncet],
  );

  const getIdentity = useCallback(
    async (
      address: string,
      first?: number,
      after?: string,
      namespace?: string,
    ): Promise<type.CyberConnectIdentity | undefined> => {
      const { data } = await graphInstance
        .query(query.queryCyberConncetIdentity, { address, first, after, namespace })
        .toPromise();

      return data?.identity;
    },
    [],
  );

  const getFollowStatus = useCallback(
    async (fromAddr: string, toAddrList: string[]): Promise<type.CyberConnectConnectionResp> => {
      const { data } = await graphInstance
        .query(query.queryCyberConncetConnections, { fromAddr, toAddrList })
        .toPromise();

      return data?.connections || [];
    },
    [],
  );

  const getRecommendations = useCallback(
    async (
      address: string,
      first?: number,
      after?: string,
      namespace?: string,
    ): Promise<type.CyberConnectRecommendationsResp | undefined> => {
      const { data } = await graphInstance
        .query(query.queryCyberConncetRecommendations, { address, first, after, namespace })
        .toPromise();

      return data?.recommendations;
    },
    [],
  );

  return {
    follow,
    unfollow,
    batchFollow,
    twitterAuthorize,
    twitterVerify,
    githubAuthorize,
    githubVerify,
    getIdentity,
    getFollowStatus,
    getRecommendations,
  };
};
