import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// 북마크 개수 <id, bookmark_count>
type BookmarkCount = Record<number, number>;

interface TipStoreState {
  selectedTips: number[];
  selectedStores: number[];
  selectedReviews: number[];

  reviewCount: BookmarkCount;

  toggleTip: (_: number) => void;
  toggleStore: (_: number) => void;
  toggleReview: (_: number) => void;
  setSelectedTips: (_: number[]) => void;
  setSelectedStores: (_: number[]) => void;
  setSelectedReviews: (_: number[]) => void;
  setReviewCount: (_: BookmarkCount) => void;
  resetAllBookmarks: () => void;
}

const useBookmarkStore = create<TipStoreState>()(
  devtools(
    persist(
      (set) => ({
        // 내가 저장한 tip id들
        selectedTips: [1, 2, 3],
        selectedStores: [1],
        selectedReviews: [1],

        // 저장하기 count
        reviewCount: {},

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

        toggleReview: (reviewId) =>
          set((state) => {
            const isBookmarked = state.selectedReviews.includes(reviewId);
            const currentCount = state.reviewCount[reviewId] ?? 0;
            const newCount = isBookmarked ? Math.max(0, currentCount - 1) : currentCount + 1;

            return {
              selectedReviews: isBookmarked
                ? state.selectedReviews.filter((x) => x !== reviewId)
                : [...state.selectedReviews, reviewId],
              reviewCount: {
                ...state.reviewCount,
                [reviewId]: newCount,
              },
            };
          }),

        // 초기에 내가 저장한 tip id들을 한번에 setting
        setSelectedTips: (idArray) => set({ selectedTips: idArray }),

        // 초기에 내가 저장한 store id들을 한번에 setting
        setSelectedStores: (idArray) => set({ selectedStores: idArray }),

        // 초기에 내가 저장한 review id들을 한번에 setting
        setSelectedReviews: (idArray) => set({ selectedReviews: idArray }),

        // 리뷰 북마크 카운트 수 저장
        setReviewCount: (bookmarkRecord) => set({ reviewCount: bookmarkRecord }),

        // 모든 저장된 북마크 id 및 개수 초기화
        resetAllBookmarks: () =>
          set({ selectedTips: [], selectedStores: [], selectedReviews: [], reviewCount: {} }),
      }),
      { name: 'tip-store' }
    )
  )
);

export default useBookmarkStore;
