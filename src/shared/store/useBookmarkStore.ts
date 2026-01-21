import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TipStoreState {
  selectedTips: number[];
  selectedStores: number[];
  selectedReviews: number[];

  toggleTip: (_: number) => void;
  toggleStore: (_: number) => void;
  toggleReview: (_: number) => void;
  setSelectedTips: (_: number[]) => void;
  setSelectedStores: (_: number[]) => void;
  setSelectedReviews: (_: number[]) => void;
  resetAllBookmarks: () => void;
}

const useBookmarkStore = create<TipStoreState>()(
  persist(
    (set) => ({
      // 내가 저장한 tip id들
      selectedTips: [1, 2, 3],
      selectedStores: [1],
      selectedReviews: [],

      // tip을 토글
      toggleTip: (tipId) =>
        set((state) => ({
          selectedTips: state.selectedTips.includes(tipId)
            ? state.selectedTips.filter((x) => x !== tipId)
            : [...state.selectedTips, tipId],
        })),

      // store를 토글
      toggleStore: (storeId) =>
        set((state) => ({
          selectedStores: state.selectedStores.includes(storeId)
            ? state.selectedStores.filter((x) => x !== storeId)
            : [...state.selectedStores, storeId],
        })),

      // review를 토글
      toggleReview: (reviewId) =>
        set((state) => ({
          selectedReviews: state.selectedReviews.includes(reviewId)
            ? state.selectedReviews.filter((x) => x !== reviewId)
            : [...state.selectedReviews, reviewId],
        })),

      // 초기에 내가 저장한 tip id들을 한번에 setting
      setSelectedTips: (idArray) => set({ selectedTips: idArray }),

      // 초기에 내가 저장한 store id들을 한번에 setting
      setSelectedStores: (idArray) => set({ selectedStores: idArray }),

      // 초기에 내가 저장한 review id들을 한번에 setting
      setSelectedReviews: (idArray) => set({ selectedReviews: idArray }),

      // 모든 저장된 북마크 초기화
      resetAllBookmarks: () => set({ selectedTips: [], selectedStores: [], selectedReviews: [] }),
    }),
    { name: 'tip-store' }
  )
);

export default useBookmarkStore;
