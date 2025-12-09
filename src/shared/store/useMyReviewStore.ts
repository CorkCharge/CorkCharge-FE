import { create } from 'zustand';

interface ReviewStoreType {
  selectedReviews: Set<number>;
  toggleReview: (id: number) => void;
}

const useMyReviewStore = create<ReviewStoreType>((set) => ({
  selectedReviews: new Set(),

  toggleReview: (id: number) =>
    set((state) => {
      const newSet = new Set(state.selectedReviews);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selectedReviews: newSet };
    }),
}));

export default useMyReviewStore;
