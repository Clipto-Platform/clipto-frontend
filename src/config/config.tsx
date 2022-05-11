import { Config } from './types';

const configCommon = {
  minDeliveryTime: 3,

  email: 'admin@clipto.io',
  discord: 'https://discord.com/invite/fpVMmerNZm',
  twitter: 'https://twitter.com/CliptoDAO',
  documentation: 'https://docs.clipto.io/',
  terms: 'https://docs.clipto.io/',
  policy: 'https://docs.clipto.io/',
};

const configTest = {
  chainId: 80001,
  chainName: 'Polygon Testnet Mumbai',
  chainSymbol: 'MATIC',

  exchangeAddress: '0x307736ececf51104a841cff44a2508775878fe3f',
  exchangeAddressV1: '0x10970e6fd7545d24021c2de1ee7963e6f3235df2',
  erc20TokenNames: ['MATIC', 'WMATIC', 'WETH', 'USDC'],
  erc20Contracts: {
    MATIC: '0x0000000000000000000000000000000000000000',
    WMATIC: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    WETH: '0x714550c2c1ea08688607d86ed8eef4f5e4f22323',
    USDC: '0xe11a86849d99f524cac3e7a0ec1241828e332c62', // not official
  },

  rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  graphApi: 'https://api.thegraph.com/subgraphs/name/clipto-platform/clipto-subgraph-tstnet',
  apiUrl: 'https://testapi.clipto.io',

  getContractExplorer: (address: string) => `https://mumbai.polygonscan.com/address/${address}`,
  getTokenExplorer: (address: string) => `https://mumbai.polygonscan.com/token/${address}`,
  getOpenSeaExplorer: (address: string, tokenId: number) =>
    `https://testnets.opensea.io/assets/mumbai/${address}/${tokenId}`,
};

const configProd = {
  chainId: 137,
  chainName: 'Polygon',
  chainSymbol: 'MATIC',

  exchangeAddress: '0x36a9f25b8aa6b941b0c8177684e8ecff59376d9a',
  exchangeAddressV1: '0xB491F739463B5bD43bCb243703F2B6742d9F779b',
  erc20TokenNames: ['MATIC', 'WMATIC', 'WETH', 'USDC'],
  erc20Contracts: {
    MATIC: '0x0000000000000000000000000000000000000000',
    WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  },

  rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/Wk4fc10DkXi2lhLq30tw_eSHPuzUyRnV',
  graphApi: 'https://api.thegraph.com/subgraphs/name/clipto-platform/clipto-subgraph-mainnet',
  apiUrl: 'https://api.clipto.io',

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

// jonathan - sorry atul 
export const ERC20_CONTRACTS: { [token: string]: string } = {
  MATIC: '0x0000000000000000000000000000000000000000',
  WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  WETH: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
};

export const getTokenSymbol = (token: string) => {
  return Object.keys(ERC20_CONTRACTS).find((key) => {
    return ERC20_CONTRACTS[key].toLowerCase() === token.toLowerCase();
  });
};

const ENV = 'TEST'
export const LENS_URI = {
  DEV: "https://api-mumbai.lens.dev/",
  TEST: "https://api-mumbai.lens.dev/",
  PROD: "https://api-mumbai.lens.dev/"
}[ENV] //wtf - this is a thing?

export const LENS_HUB_CONTRACT_ADDRESS = {
  DEV: undefined,
  TEST: "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0",
  PROD: undefined
}[ENV]
export default config;
