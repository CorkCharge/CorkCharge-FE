import { create } from 'zustand';
import type { Review } from '../types/mypage';

interface MyProfile {
  nickname: string;
  socialId: string;
  reviews: Review[];
}

interface MyPageStore {
  myProfile: MyProfile;
  setMyProfile: (fetched: Partial<MyProfile>) => void;
}

const useMyPageStore = create<MyPageStore>((set) => ({
  myProfile: {
    nickname: '',
    socialId: '',
    reviews: [
      {
        restaurantName: null,
        location: null,
        thumbnailUrl: '',
      },
    ],
  },

  setMyProfile: (fetched) => set((state) => ({ myProfile: { ...state.myProfile, ...fetched } })),
}));

export default useMyPageStore;
