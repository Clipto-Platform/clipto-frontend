import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({
  // allow any chain to 'connect' so we can help redirect them
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [80001],
  chainId: 80001,
  rpc: {
    80001: "https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG",
  },
  qrcode: true,
  clientMeta: {
    name: 'Clipto',
    description: 'Clipto',
    url: `https://*`,
    icons: [],
  },
});
