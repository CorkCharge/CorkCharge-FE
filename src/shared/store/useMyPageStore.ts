/**
 * 마이페이지에서 사용하는 store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyProfile {
  nickname: string;
  email: string;
  reviews: Review[];
}

interface MyPageStore {
  myProfile: MyProfile;
  setMyProfile: (_: Partial<MyProfile>) => void;
}
interface Review {
  restaurantName: string;
  location: string;
  thumbnailUrl: string;
}

const initState = {
  nickname: '',
  email: '',
  reviews: [],
};

const useMyPageStore = create<MyPageStore>()(
  persist<MyPageStore>(
    (set) => ({
      myProfile: {
        nickname: '',
        email: '',
        reviews: [],
      },

      setMyProfile: (fetched) => set((prev) => ({ myProfile: { ...prev.myProfile, ...fetched } })),

      clear: () => set({ myProfile: { ...initState } }),
    }),
    { name: 'my-profile' }
  )
);

export default useMyPageStore;
