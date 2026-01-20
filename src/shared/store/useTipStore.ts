import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TipStoreState {
  selectedTips: number[];

  toggleTip: (_: number) => void;
  setSelectedTips: (_: number[]) => void;
  resetSelectedTips: () => void;
}

const useTipStore = create<TipStoreState>()(
  persist(
    (set) => ({
      // 내가 저장한 tip id들
      selectedTips: [1, 2, 3],

      // tip을 토글
      toggleTip: (tipId) =>
        set((state) => ({
          selectedTips: state.selectedTips.includes(tipId)
            ? state.selectedTips.filter((x) => x !== tipId)
            : [...state.selectedTips, tipId],
        })),

      // 초기에 내가 저장한 tip id들을 한번에 setting
      setSelectedTips: (idArray) => set({ selectedTips: idArray }),

      // 내가 선택한 tip id 초기화
      resetSelectedTips: () => set({ selectedTips: [] }),
    }),
    { name: 'tip-store' }
  )
);

export default useTipStore;
