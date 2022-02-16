export const DEV = false;
export const ENV = DEV ? 'DEV' : 'TEST';

export const CHAIN_IDS = {
  POLYGON_MAINNET: 4,
  POLYGON_TESTNET: 80001,
  DAPPTOOLS: 99,
};

const SYMBOLS = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'ETH',
  [CHAIN_IDS.POLYGON_TESTNET]: 'MATIC',
  [CHAIN_IDS.DAPPTOOLS]: 'ETH',
};

export const CHAIN_NAMES: { [chainId: number]: string } = {
  '4': 'Rinkeby Testnet',
  '80001': 'Polygon testnet',
  '99': 'Dapp tools localhost',
};

export const POLLING_INTERVAL = 12000;

export const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://eth-rinkeby.alchemyapi.io/v2/mR8RGCPVD6NAQOdhUmEHULGhzeg8aQaK',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  [CHAIN_IDS.DAPPTOOLS]: 'http://localhost:8545',
};

export const DEFAULT_CHAIN_ID = DEV ? CHAIN_IDS.DAPPTOOLS : CHAIN_IDS.POLYGON_TESTNET;
export const SYMBOL = SYMBOLS[DEFAULT_CHAIN_ID];

export const EXCHANGE_ADDRESS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: '0x3C78bF376815C322d216899d041ff90Ed86bbFa7',
  [CHAIN_IDS.POLYGON_TESTNET]: '0x36A9F25B8AA6b941B0c8177684E8ecff59376D9a',
  [CHAIN_IDS.DAPPTOOLS]: '0x500fB9CAE50b307Fb82C9282f5eaCBdF14fa8cC2',
};

// block number of contract deployment
export const START_BLOCKS: { [chainId: number]: number } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 24789312,
  [CHAIN_IDS.POLYGON_TESTNET]: 24789312,
  [CHAIN_IDS.DAPPTOOLS]: 0,
};

export const GRAPH_APIS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://api.thegraph.com/subgraphs/name/ap-atul/clipto-subgraph',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://api.thegraph.com/subgraphs/name/ap-atul/clipto-subgraph',
  [CHAIN_IDS.DAPPTOOLS]: 'https://api.thegraph.com/subgraphs/name/ap-atul/clipto-subgraph',
};

export const HELP_EMAIL = 'admin@clipto.io';
export const MIN_DELIVERY_TIME = 3;
export const DISCORD_LINK = 'https://discord.com/invite/fpVMmerNZm';

export const API_URL = DEV ? 'http://localhost:8000' : 'https://api.clipto.io';

export const getPolygonScan = (addr: string) =>
  ENV === 'TEST' ? `https://mumbai.polygonscan.com/token/${addr}` : `https://polygonscan.com/token/${addr}`;

export const getContractLink = (addr: string) =>
  ENV === 'TEST' ? `https://mumbai.polygonscan.com/address/${addr}` : `https://polygonscan.com/address/${addr}`;

export const getOpensea = (addr: string, index: number) =>
  ENV === 'TEST'
    ? `https://testnets.opensea.io/assets/mumbai/${addr}/${index}`
    : `https://opensea.io/assets/matic/${addr}/${index}`;
