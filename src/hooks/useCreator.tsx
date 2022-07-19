import { useEffect, useState } from 'react';
import * as api from '../api';
import { EntityCreator } from '../api/types';

export const useCreator = (creatorId: string | undefined | null) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [creator, setCreator] = useState<EntityCreator>();
  useEffect(() => {
    const getCreatorData = async () => {
      console.log(creatorId)
      const response = await api.creatorById(creatorId || '');
      if (response.data) {
        setCreator(response.data.creator);
      }
      console.log(response)
      setLoaded(true)
    };
    try {
      if (!creatorId) {
        throw 'creatorId not found';
      }
      getCreatorData();
    } catch (error) {}
  }, [creatorId]);
  return {
    creator,
    loaded,
  };
};
