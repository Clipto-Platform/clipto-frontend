export interface Config {
  environment: 'production' | 'test';

  chainId: number;
  chainName: string;
  chainSymbol: string;
  defaultToken: string;

  exchangeAddress: string;
  exchangeAddressV1: string;
  erc20TokenNames: string[];
  erc20Contracts: {
    MATIC: string;
    WMATIC: string;
    WETH: string;
    USDC: string;
  };
  
  rpcUrl: string;
  graphApi: string;
  apiUrl: string;

  lens: {
    contract: string;
    url: string;
    getHandleToSearch: (v: string) => string
  }

  minDeliveryTime: number;

  email: string | undefined;
  discord: string;
  twitter: string;
  documentation: string;
  terms: string;
  policy: string;

  getContractExplorer(address: string): string;
  getTokenExplorer(address: string): string;
  getOpenSeaExplorer(address: string, tokenId: number): string;
}

export type ERCTokenType = 'MATIC' | 'WMATIC' | 'WETH' | 'USDC';
