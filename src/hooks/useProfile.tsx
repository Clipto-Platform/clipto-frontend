import create from 'zustand';

import { immer } from '../utils/zustand';

export type CreateUserDto = {
  bio: string | undefined;
  userName: string | undefined;
  profilePicture: string | undefined;
  deliveryTime: number | undefined;
  demos: string[];
  price: number | undefined;
  tweetUrl: string | undefined;
  address: string | undefined;
};

export interface CreateUserDtoFull {
  bio: string;
  userName: string;
  profilePicture: string;
  deliveryTime: number;
  demos: string[];
  price: number;
  tweetUrl: string;
  address: string;
}

export interface GetUserResponse {
  bio: string;
  userName: string;
  profilePicture: string;
  deliveryTime: number;
  demos: string[];
  price: string;
  twitterHandle: string;
  address: string;
  id: number;
}

export type UserProfileSet = {
  setBio: (bio: string) => void;
  setUsername: (username: string) => void;
  setProfilePicture: (profilePicture: string) => void;
  setDeliveryTime: (deliveryTime: number) => void;
  setDemos: (demos: string[]) => void;
  setPrice: (price: number) => void;
  setTweetUrl: (tweetUrl: string) => void;
  setAddress: (address: string) => void;
};

export type UserProfile = CreateUserDto & UserProfileSet;

export const useProfile = create<UserProfile>(
  immer((set) => ({
    bio: undefined,
    userName: undefined,
    profilePicture: undefined,
    deliveryTime: undefined,
    demos: [],
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
    setPrice: (price: number) => {
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

/**
 * Gets only keys that have values (not functions)
 * @param userProfile
 * @returns
 */
export const values = (userProfile: UserProfile): CreateUserDto => {
  const keys = Object.keys(userProfile)
    .filter((i) => !i.startsWith('set'))
    .map((i) => [i, userProfile[i as keyof UserProfile]]);
  return Object.fromEntries(keys);
};
