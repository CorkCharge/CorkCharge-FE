import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review } from '../types/mypage';

interface MyProfile {
  nickname: string;
  socialId: string;
  reviews: Review[];
}

interface MyPageStore {
  myProfile: MyProfile;
  setMyProfile: (fetched: MyProfile) => void;
}

const initState = {
  nickname: '',
  socialId: '',
  reviews: [],
};

const useMyPageStore = create<MyPageStore>()(
  persist<MyPageStore>(
    (set) => ({
      myProfile: {
        nickname: '',
        socialId: '',
        reviews: [],
      },

      setMyProfile: (fetched) => set({ myProfile: fetched }),
      clear: () => set({ myProfile: { ...initState } }),
    }),
    { name: 'my-profile' }
  )
);

export default useMyPageStore;
