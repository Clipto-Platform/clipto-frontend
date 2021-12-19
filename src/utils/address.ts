export const getShortenedAddress = (address: string, start = 6, end = 4) => {
  const shortenedAddress = `${address.slice(0, start)}...${address.slice(-1 * end)}`;
  return shortenedAddress;
};
