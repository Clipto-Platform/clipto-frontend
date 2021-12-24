import { toast } from 'react-toastify';
import create from 'zustand';

import { API_URL } from '../config/config';
import { immer } from '../utils/zustand';

export type UserProfile = {
  bio: string | undefined;
  userName: string | undefined;
  profilePicture: string | undefined;
  deliveryTime: number | undefined;
  demos: string[];
  price: string | undefined;
  tweetUrl: string | undefined;
  address: string | undefined;
  setBio: (bio: string) => void;
  setUsername: (username: string) => void;
  setProfilePicture: (profilePicture: string) => void;
  setDeliveryTime: (deliveryTime: number) => void;
  setDemos: (demos: string[]) => void;
  setPrice: (price: string) => void;
  setTweetUrl: (tweetUrl: string) => void;
  setAddress: (address: string) => void;
};

export const useProfile = create<UserProfile>(
  immer((set) => ({
    bio: undefined,
    userName: undefined,
    profilePicture: undefined,
    deliveryTime: undefined,
    demos: ['', '', ''],
    price: undefined,
    tweetUrl: undefined,
    address: undefined,
    setBio: (bio: string) => {
      set((draft) => {
        draft.bio = bio;
      });
    },
    setUsername: (userName: string) => {
      set((draft) => {
        draft.userName = userName;
      });
    },
    setProfilePicture: (profilePicture: string) => {
      set((draft) => {
        draft.profilePicture = profilePicture;
      });
    },
    setDeliveryTime: (deliveryTime: number) => {
      set((draft) => {
        draft.deliveryTime = deliveryTime;
      });
    },
    setPrice: (price: string) => {
      set((draft) => {
        draft.price = price;
      });
    },
    setDemos: (demos: string[]) => {
      set((draft) => {
        draft.demos = demos;
      });
    },
    setTweetUrl: (tweetUrl: string) => {
      set((draft) => {
        draft.tweetUrl = tweetUrl;
      });
    },
    setAddress: (address: string) => {
      set((draft) => {
        draft.address = address;
      });
    },
  })),
);

//ew, todo: something saner
export const values = (userProfile: UserProfile): Partial<UserProfile> => {
  return Object.fromEntries(
    Object.keys(userProfile)
      .filter((i) => !i.startsWith('set'))
      .map((i) => [i, userProfile[i as keyof UserProfile]]),
  );
};
