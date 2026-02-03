import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// 북마크 개수 <id, bookmark_count>
type BookmarkCount = Record<number, number>;

type RestaurantGroupMap = {
  [restaurantId: number]: number[];
};

interface BookmarkStoreState {
  selectedTips: number[];
  // selectedStores: number[];
  selectedReviews: number[];
  selectedStores: RestaurantGroupMap;

  reviewCount: BookmarkCount;

  toggleTip: (_: number) => void;
  addOrRemoveStore: () => void;
  toggleReview: (_: number) => void;
  setSelectedTips: (_: number[]) => void;
  updateSelectedStores: (_rId: number, _gIds: number[]) => void;
  setSelectedReviews: (_: number[]) => void;
  setReviewCount: (_: BookmarkCount) => void;
  resetAllBookmarks: () => void;
  linkRestaurantsToGroup: (_rId: number[], _gId: number) => void;
}

const useBookmarkStore = create<BookmarkStoreState>()(
  devtools(
    persist(
      (set) => ({
        // 내가 저장한 tip id들
        selectedTips: [1, 2, 3],
        // selectedStores: [1],
        selectedReviews: [1],
        selectedStores: { 1: [1, 2] },

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
        // toggleStore: (storeId) =>
        //   set((state) => ({
        //     selectedStores: state.selectedStores.includes(storeId)
        //       ? state.selectedStores.filter((x) => x !== storeId)
        //       : [...state.selectedStores, storeId],
        //   })),
        addOrRemoveStore: () => {},

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

        // store의 group ID들 update
        updateSelectedStores: (rId, gIdArray) =>
          set((state) => {
            const newInfo = { ...state.selectedStores };
            if (gIdArray.length === 0) delete newInfo[rId];
            else newInfo[rId] = gIdArray;
            return { selectedStores: newInfo };
          }),

        // 초기에 내가 저장한 review id들을 한번에 setting
        setSelectedReviews: (idArray) => set({ selectedReviews: idArray }),

        // 리뷰 북마크 카운트 수 저장
        setReviewCount: (bookmarkRecord) => set({ reviewCount: bookmarkRecord }),

        // 모든 저장된 북마크 id 및 개수 초기화
        resetAllBookmarks: () =>
          set({
            selectedTips: [],
            selectedStores: [],
            selectedReviews: [],
            reviewCount: {},
          }),

        // 레스토랑 id들을 그룹에 mapping
        linkRestaurantsToGroup: (restIds, groupId) =>
          set((state) => {
            const next = { ...state.selectedStores };

            restIds.forEach((rId) => {
              const gIds = next[rId] ?? [];
              if (!gIds.includes(groupId)) next[rId] = [...gIds, groupId];
            });

            return { selectedStores: next };
          }),
      }),
      {
        name: 'bookmark-store',
      }
    )
  )
);

export default useBookmarkStore;
