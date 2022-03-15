import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { DEFAULT_CHAIN_ID , RPC_URLS } from '../config/config'
export const injected = new InjectedConnector({
  // allow any chain to 'connect' so we can help redirect them
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [137],
  chainId: 137,
  rpc: {
    137:'https://polygon-mainnet.g.alchemy.com/v2/Wk4fc10DkXi2lhLq30tw_eSHPuzUyRnV',
  },
  qrcode: true,
  clientMeta: {
    name: 'Clipto',
    description: 'Clipto',
    url: `https://*`,
    icons: [],
  },
});
