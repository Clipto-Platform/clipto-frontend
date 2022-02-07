export const DEV = false;

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

export const POLLING_INTERVAL = 12000;

export const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://eth-rinkeby.alchemyapi.io/v2/mR8RGCPVD6NAQOdhUmEHULGhzeg8aQaK',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  [CHAIN_IDS.DAPPTOOLS]: 'http://localhost:8545',
};

export const DEFAULT_CHAIN_ID = DEV ? CHAIN_IDS.DAPPTOOLS : CHAIN_IDS.POLYGON_MAINNET;
export const SYMBOL = SYMBOLS[DEFAULT_CHAIN_ID];

export const EXCHANGE_ADDRESS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: '0x3C78bF376815C322d216899d041ff90Ed86bbFa7',
  [CHAIN_IDS.POLYGON_TESTNET]: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
  [CHAIN_IDS.DAPPTOOLS]: '0x500fB9CAE50b307Fb82C9282f5eaCBdF14fa8cC2',
};

export const HELP_EMAIL = 'admin@clipto.io';
export const MIN_DELIVERY_TIME = 3;

export const API_URL = DEV ? 'http://localhost:8000' : 'https://api.clipto.io';

export const LOADING_SCREEN = false;

