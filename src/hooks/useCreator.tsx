import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../config/config';

export interface Creator {
  address: string;
  bio: string;
  deliveryTime: number;
  demos: string[];
  id: number;
  profilePicture: string;
  price: string;
  tweetUrl: string;
  userName: string;
  twitterHandle: string;
}

export const useCreator = (creatorId: string | undefined | null) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator>();
  useEffect(() => {
    const getCreatorData = async () => {
      const restContractProfile: { data: Creator } = await axios.get(`${API_URL}/user/${creatorId}`);
      setCreator(restContractProfile.data);
      setLoaded(true);
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
