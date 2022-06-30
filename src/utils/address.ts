import config from '../config/config';

export const getShortenedAddress = (address: string, start = 6, end = 4) => {
  const shortenedAddress = `${address.slice(0, start)}...${address.slice(-1 * end)}`;
  return shortenedAddress;
};

export const getErcTokenSymbol = (address: string): string => {
  const addressToMatch = address.toLowerCase();
  for (let i = 0; i < config.erc20TokenNames.length; i++) {
    const erc20Name = config.erc20TokenNames[i];
    if (config.erc20[erc20Name].address == addressToMatch) {
      return erc20Name;
    }
  }
  return 'UNKNOWN';
};
