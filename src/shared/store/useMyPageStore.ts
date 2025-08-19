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
    nickname: '박재하',
    socialId: 'pjh6183@naver.com',
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
