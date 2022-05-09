import { useEffect, useState } from 'react';
import { Description } from '../styles/typography';
import { useExchangeContractV1 } from './useContracts';

export const useFee = () => {
  const exchangeContract = useExchangeContractV1(true);
  const [feePercent, setFeePercent] = useState('');

  useEffect(() => {
    if (exchangeContract) {
      fetchFeePercent();
    }
  }, [exchangeContract]);

  const fetchFeePercent = async () => {
    try {
      const fees = await exchangeContract.getFeeRate();
      const percent = fees[0].toNumber() / fees[1].toNumber();

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
