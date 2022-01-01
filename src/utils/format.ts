export const formatETH = (num: number, maxDecimalPlaces?: number) => {
  const len = num.toString().length;
  const intLen = parseInt(num.toString()).toString().length;
  if (len == intLen) {
    // there is no decimal
    return num.toString();
  }
  const decimalLen = 1;
  return num.toFixed(Math.min(len - intLen - decimalLen, maxDecimalPlaces || 5));
};
