import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { RPC_URLS } from '../config/config';

export const injected = new InjectedConnector({
  // allow any chain to 'connect' so we can help redirect them
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
  clientMeta: {
    name: 'Clipto',
    description: 'Clipto',
    url: `https://*`,
    icons: [],
  },
});
