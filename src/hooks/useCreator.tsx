import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { API_URL } from '../config/config';
import { ReadUserDto } from '../pages/Booking';
export const useCreator = (creatorId: string | undefined | null) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [creator, setCreator] = useState<ReadUserDto>();
  useEffect(() => {
    const getCreatorData = async () => {
      const restContractProfile: { data: ReadUserDto } = await axios.get(`${API_URL}/user/${creatorId}`);
      setCreator(restContractProfile.data);
      setLoaded(true);
    };
    try {
      if (!creatorId) {
        throw 'creatorId not found';
      }
      getCreatorData();
    } catch (error) {
      console.error(error);
    }
  }, [creatorId]);
  return {
    creator,
    loaded,
  };
};
