import config from '../config/config';

export const getShortenedAddress = (address: string, start = 6, end = 4) => {
  const shortenedAddress = `${address.slice(0, start)}...${address.slice(-1 * end)}`;
  return shortenedAddress;
};

export const getErcTokenSymbol = (address: string): string => {
  const names = Object.keys(config.erc20Contracts);
  const addresses = Object.values(config.erc20Contracts);
  const index = addresses.indexOf(address.toLowerCase());

  return index != -1 ? names[index] : 'UNKNOWN';
};
