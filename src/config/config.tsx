export const DEV = false;
export const TEST = true;
export const ENV = DEV ? 'DEV' : TEST ? 'TEST' : 'PROD';

export const CHAIN_IDS = {
  POLYGON_MAINNET: 137,
  POLYGON_TESTNET: 80001,
  DAPPTOOLS: 99,
};

const SYMBOLS = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'MATIC',
  [CHAIN_IDS.POLYGON_TESTNET]: 'MATIC',
  [CHAIN_IDS.DAPPTOOLS]: 'ETH',
};

export const CHAIN_NAMES: { [chainId: number]: string } = {
  '137': 'Polygon',
  '80001': 'Polygon Testnet Mumbai',
  '99': 'Dapp tools localhost',
};

export const POLLING_INTERVAL = 12000;

export const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://polygon-mainnet.g.alchemy.com/v2/Wk4fc10DkXi2lhLq30tw_eSHPuzUyRnV',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  [CHAIN_IDS.DAPPTOOLS]: 'http://localhost:8545',
};

export const DEFAULT_CHAIN_ID = DEV
  ? CHAIN_IDS.DAPPTOOLS
  : TEST
  ? CHAIN_IDS.POLYGON_TESTNET
  : CHAIN_IDS.POLYGON_MAINNET;
export const SYMBOL = SYMBOLS[DEFAULT_CHAIN_ID];

export const EXCHANGE_ADDRESS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: '0x36A9F25B8AA6b941B0c8177684E8ecff59376D9a',
  [CHAIN_IDS.POLYGON_TESTNET]: '0x515b631E814d3CB586e3e2cF486c0c814CC8A0Bb',
  [CHAIN_IDS.DAPPTOOLS]: '0x500fB9CAE50b307Fb82C9282f5eaCBdF14fa8cC2',
};

// block number of contract deployment
export const START_BLOCKS: { [chainId: number]: number } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 25833562,
  [CHAIN_IDS.POLYGON_TESTNET]: 24789312,
  [CHAIN_IDS.DAPPTOOLS]: 0,
};

export const GRAPH_APIS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://api.thegraph.com/subgraphs/name/clipto-platform/clipto-subgraph-mainnet',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://api.thegraph.com/subgraphs/name/rushidhanwant/multitoken_subgraph',
  [CHAIN_IDS.DAPPTOOLS]: 'https://api.thegraph.com/subgraphs/name/ap-atul/clipto-subgraph',
};
export const ERC20_CONTRACTS: { [token: string]: string } = {
  MATIC: '0x0000000000000000000000000000000000000000',
  WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  WETH: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
};

export const TOKENS = ['MATIC', 'WMATIC', 'WETH'];
export const HELP_EMAIL = 'admin@clipto.io';
export const MIN_DELIVERY_TIME = 3;
export const DISCORD_LINK = 'https://discord.com/invite/fpVMmerNZm';
export const TWITTER_LINK = 'https://twitter.com/CliptoDAO';
export const DOCS_LINK = 'https://cliptodao.gitbook.io/clipto/';
export const TERMS_LINK = 'https://cliptodao.gitbook.io/clipto/';
export const PRIVACY_LINK = 'https://cliptodao.gitbook.io/clipto/';

export const API_URL = DEV ? 'http://localhost:8000' : TEST ? 'https://testapi.clipto.io' : 'https://api.clipto.io';

export const getPolygonScan = (addr: string) =>
  ENV === 'TEST' ? `https://mumbai.polygonscan.com/token/${addr}` : `https://polygonscan.com/token/${addr}`;

export const getContractLink = (addr: string) =>
  ENV === 'TEST' ? `https://mumbai.polygonscan.com/address/${addr}` : `https://polygonscan.com/address/${addr}`;

export const getOpensea = (addr: string, index: number) =>
  ENV === 'TEST'
    ? `https://testnets.opensea.io/assets/mumbai/${addr}/${index}`
    : `https://opensea.io/assets/matic/${addr}/${index}`;


export const GOOGLE_TRACK_ID = 'UA-G-LVY3DLBQ0K';

export const getTokenSymbol = (token: string) => {
  return Object.keys(ERC20_CONTRACTS).find((key) => {
    return ERC20_CONTRACTS[key].toLowerCase() === token.toLowerCase();
  });
};
