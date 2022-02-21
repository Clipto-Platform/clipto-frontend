import { useEffect, useState } from 'react';
import { Description } from '../styles/typography';
import { useExchangeContract } from './useContracts';

export const useFee = () => {
  const exchangeContract = useExchangeContract(true);
  const [feePercent, setFeePercent] = useState('');

  useEffect(() => {
    if (exchangeContract) {
      fetchFeePercent();
    }
  }, [exchangeContract]);

  const fetchFeePercent = async () => {
    try {
      const scale = await exchangeContract.scale();
      const feeRate = await exchangeContract.feeRate();
      const percent = ((feeRate.toNumber() / scale.toNumber()) * 100).toFixed(1);
      setFeePercent(`${percent}%`);
    } catch (err) {}
  };
  return {
    feePercent,
    FeeDescription: () => (
      <>
        {feePercent && (
          <Description style={{ fontSize: 10, marginTop: '8px' }}>
            * Includes a {feePercent} fee to support the platform
          </Description>
        )}
      </>
    ),
  };
};
