import { Config } from './types';

export const RELAY_ON = true; //broadcast api for free gas on lens, must be on port 4783, https://clipto.io

const configCommon = {
  minDeliveryTime: 3,

  email: undefined, //'admin@clipto.io',
  discord: 'https://discord.com/invite/fpVMmerNZm',
  twitter: 'https://twitter.com/CliptoDAO',
  documentation: 'https://docs.clipto.io/',
  terms: 'https://docs.clipto.io/',
  policy: 'https://docs.clipto.io/',
};

const configTest = {
  url: 'https://test.clipto.io',
  chainId: 80001,
  chainName: 'Polygon Testnet Mumbai',
  chainSymbol: 'MATIC',
  defaultToken: 'USDC',

  exchangeAddress: '0x307736ececf51104a841cff44a2508775878fe3f',
  exchangeAddressV1: '0x10970e6fd7545d24021c2de1ee7963e6f3235df2',
  erc20TokenNames: ['USDC', 'MATIC', 'WMATIC', 'WETH'],
  erc20: {
    MATIC: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    WMATIC: {
      address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
      decimals: 18,
    },
    WETH: {
      address: '0x714550c2c1ea08688607d86ed8eef4f5e4f22323',
      decimals: 18,
    },
    USDC: {
      address: '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
      decimals: 6,
    },
  },
  erc20Decimals: {
    MATIC: 18,
    WMATIC: 18,
    WETH: 18,
    USDC: 6,
  },
  rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  graphApi: 'https://api.thegraph.com/subgraphs/name/clipto-platform/clipto-subgraph-tstnet',
  apiUrl: 'https://testapi.clipto.io',

  lens: {
    url: 'https://api-mumbai.lens.dev/',
    contract: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
    getHandleToSearch: (handle: string) => `${handle}.test`, //this is to be used when querying if a lensHandle exists. When you create a profile, a postfix is automatically attached
  },

  getContractExplorer: (address: string) => `https://mumbai.polygonscan.com/address/${address}`,
  getTokenExplorer: (address: string) => `https://mumbai.polygonscan.com/token/${address}`,
  getOpenSeaExplorer: (address: string, tokenId: number) =>
    `https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`,
};

const configProd = {
  url: 'https://clipto.io',
  chainId: 137,
  chainName: 'Polygon',
  chainSymbol: 'MATIC',
  defaultToken: 'USDC',

  exchangeAddress: '0x36a9f25b8aa6b941b0c8177684e8ecff59376d9a',
  exchangeAddressV1: '0xB491F739463B5bD43bCb243703F2B6742d9F779b',
  erc20TokenNames: ['USDC', 'MATIC', 'WMATIC', 'WETH'],
  erc20: {
    MATIC: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
    },
    WMATIC: {
      address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      decimals: 18,
    },
    WETH: {
      address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      decimals: 18,
    },
    USDC: {
      address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      decimals: 6,
    },
  },
  rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/Wk4fc10DkXi2lhLq30tw_eSHPuzUyRnV',
  graphApi: 'https://api.thegraph.com/subgraphs/name/clipto-platform/clipto-subgraph-mainnet',
  apiUrl: 'https://api.clipto.io',

  lens: {
    url: 'https://api.lens.dev',
    contract: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
    getHandleToSearch: (handle: string) => `${handle}.lens`, //this is to be used when querying if a lensHandle exists. When you create a profile, a postfix is automatically attached
  },

  getContractExplorer: (address: string) => `https://polygonscan.com/address/${address}`,
  getTokenExplorer: (address: string) => `https://polygonscan.com/token/${address}`,
  getOpenSeaExplorer: (address: string, tokenId: number) => `https://opensea.io/assets/matic/${address}/${tokenId}`,
};

const config: Config =
  import.meta.env.VITE_APP_ENV === 'production'
    ? {
        environment: 'production',
        ...configCommon,
        ...configProd,
      }
    : {
        environment: 'test',
        ...configCommon,
        ...configTest,
      };

export default config;
