import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import create from 'zustand';

import { API_URL } from '../config/config';
import { immer } from '../utils/zustand';

export type UserProfile = {
  bio: string | undefined;
  userName: string | undefined;
  profilePicture: string | undefined;
  deliveryTime: number | undefined;
  demos: string[] | undefined;
  setBio: (bio: string) => void;
  setUsername: (username: string) => void;
  setProfilePicutre: (profilePicture: string) => void;
  setDeliveryTime: (deliveryTime: number) => void;
  setDemos: (demos: string[]) => void;
  verifyUser: (tweetUrl: string, address: string) => Promise<void>;
};

export const useProfile = create<UserProfile>(
  immer((set) => ({
    bio: undefined,
    userName: undefined,
    profilePicture: undefined,
    deliveryTime: undefined,
    demos: undefined,
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
    setProfilePicutre: (profilePicture: string) => {
      set((draft) => {
        draft.profilePicture = profilePicture;
      });
    },
    setDeliveryTime: (deliveryTime: number) => {
      set((draft) => {
        draft.deliveryTime = deliveryTime;
      });
    },
    setDemos: (demos: string[]) => {
      set((draft) => {
        draft.demos = demos;
      });
    },
    verifyUser: async (tweetUrl: string, address: string) => {
      const verificationResult = await axios.post(`${API_URL}/user/verify`, { tweetUrl, address }).catch((e) => {
        console.log(e);
      });
      if (verificationResult && verificationResult.data && verificationResult.data.includes) {
        set((draft) => {
          draft.userName = verificationResult.data.includes.users[0].name;
          draft.profilePicture = verificationResult.data.includes.users[0].profile_image_url;
        });
        const navigate = useNavigate();
        navigate('/');
      } else {
        toast.error('Failed to verify your Twitter!');
      }
    },
  })),
);
