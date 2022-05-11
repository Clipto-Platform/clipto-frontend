import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import config from '../config/config';

export const injected = new InjectedConnector({
  // allow any chain to 'connect' so we can help redirect them
});

// keep the values static, using config constants
// fails for some reason
const ProdConfig = {
  supportedChainIds: [137],
  chainId: 137,
  rpc: {
    137: 'https://polygon-mainnet.g.alchemy.com/v2/Wk4fc10DkXi2lhLq30tw_eSHPuzUyRnV',
  },
  qrcode: true,
  clientMeta: {
    name: 'Clipto',
    description: 'Clipto',
    url: `https://*`,
    icons: [],
  },
};

const TestConfig = {
  supportedChainIds: [80001],
  chainId: 80001,
  rpc: {
    80001: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  },
  qrcode: true,
  clientMeta: {
    name: 'Clipto',
    description: 'Clipto',
    url: `https://*`,
    icons: [],
  },
};

const walletConfig = config.environment == 'test' ? TestConfig : ProdConfig;
export const walletconnect = new WalletConnectConnector(walletConfig);
