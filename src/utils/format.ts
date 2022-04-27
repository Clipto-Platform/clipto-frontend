import { ethers } from 'ethers';

export const formatETH = (value: number | string, maxDecimalPlaces?: number) => {
  const num = convertToFloat(value);
  const len = num.toString().length;
  const intLen = parseInt(num.toString()).toString().length;
  if (len == intLen) {
    // there is no decimal
    return num.toString();
  }
  const decimalLen = 1;
  return num.toFixed(Math.min(len - intLen - decimalLen, maxDecimalPlaces || 5));
};

export const bigIntToReadable = (value: string | number) => {
  return ethers.utils.formatEther(value);
};

export const convertToFloat = (value: string | number): number => {
  if (typeof value === 'string') return parseFloat(value);
  return value;
};

export const convertToInt = (value: string | number): number => {
  if (typeof value === 'string') return parseInt(value);
  return value;
};

export const removeTrailingZero = (value: string): string => {
  const regex = /^(\d+\.\d*?[1-9])0+$/;
  const match = regex.exec(value);
  return match ? match[1] : parseFloat(value).toString();
};
