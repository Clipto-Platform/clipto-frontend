export const DEV = true;

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

export const POLLING_INTERVAL = 12000;

export const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: 'https://polygon.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  [CHAIN_IDS.POLYGON_TESTNET]: 'https://polygon-mumbai.g.alchemy.com/v2/VMBpFqjMYv2w-MWnc9df92w3R2TpMvSG',
  [CHAIN_IDS.DAPPTOOLS]: 'http://localhost:8545',
};

export const DEFAULT_CHAIN_ID = DEV ? CHAIN_IDS.DAPPTOOLS : CHAIN_IDS.POLYGON_MAINNET;
export const SYMBOL = SYMBOLS[DEFAULT_CHAIN_ID];

export const EXCHANGE_ADDRESS: { [chainId: number]: string } = {
  [CHAIN_IDS.POLYGON_MAINNET]: '0x475b5834085bf61A3B330eBd1c689ff8459258C2',
  [CHAIN_IDS.POLYGON_TESTNET]: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
  [CHAIN_IDS.DAPPTOOLS]: '0x2dEF73E364EB5441A5E09955bC5c552016759CBe',
};

export const HELP_EMAIL = 'admin@clipto.io';
export const MIN_DELIVERY_TIME = 3;

export const API_URL = DEV ? 'http://localhost:8000' : 'https://api.clipto.io';
