import { create } from 'zustand';

interface ReviewStoreType {
  selectedReviews: Set<number>; // 내가 keep한 review id
  writingReviewRating: number; // 지금 쓰고 있는 리뷰 rating
  writingReviewInfo: Map<number, number>; // 지금 쓰고 있는 리뷰의 (가게ID, 리뷰 별점)
  toggleReview: (_: number) => void; // 리뷰 keep/undo
  setRating: (_: number) => void; //지금 쓰는 리뷰 rating 설정
  setReviewInfo: (_id: number, _rating: number) => void;
}

const useMyReviewStore = create<ReviewStoreType>((set) => ({
  selectedReviews: new Set(),
  writingReviewRating: 0,
  writingReviewInfo: new Map(),

  toggleReview: (id: number) =>
    set((state) => {
      const newSet = new Set(state.selectedReviews);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selectedReviews: newSet };
    }),
  setRating: (rating: number) => set({ writingReviewRating: rating }),
  setReviewInfo: (id: number, rating: number) =>
    set({ writingReviewInfo: new Map<number, number>([[id, rating]]) }),
}));

export default useMyReviewStore;
