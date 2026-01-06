import { create } from 'zustand';

interface RegionFilterProps {
  filteredRegions: RegionTree;
  selectedDongNames: string[];
  deleteByDong: (_: string) => void;
  toggleAddress: (_do: string, _si: string, _gu: string) => void;
  resetAddress: () => void;
  setSelectedDongNames: (_: string[]) => void;
  removeDongFromArray: (_: string) => void;
}

interface RegionTree {
  [doname: string]: {
    [siname: string]: string[];
  };
}

const useRegionFilterStore = create<RegionFilterProps>((set, get) => ({
  // 도 - 시 - 동 관리
  filteredRegions: {},
  // 동이름 배열
  selectedDongNames: [],

  // filteredRegions에서 dong이름으로 제거
  deleteByDong: (dong: string) => {
    const newFiltered = structuredClone(get().filteredRegions);

    for (const dName in newFiltered) {
      for (const sName in newFiltered[dName]) {
        newFiltered[dName][sName] = newFiltered[dName][sName].filter((x) => x !== dong);
      }
    }

    set({ filteredRegions: newFiltered });
  },

  // filteredRegions에 넣고 빼기
  toggleAddress: (doName: string, siName: string, guName: string) =>
    set((state) => {
      const siArr = state.filteredRegions[doName]?.[siName] || [];

      if (siArr.includes(guName)) {
        const newRegions = { ...state.filteredRegions };
        newRegions[doName] = { ...newRegions[doName] };
        newRegions[doName][siName] = newRegions[doName][siName].filter((x) => x !== guName);
        if (newRegions[doName][siName].length < 1) {
          delete newRegions[doName][siName];
        }
        if (Object.keys(newRegions[doName]).length < 1) {
          delete newRegions[doName];
        }
        return { filteredRegions: newRegions };
      } else {
        const doObj = state.filteredRegions[doName] || {};
        const siArr = doObj[siName] || [];
        return {
          ...state.filteredRegions,
          [doName]: {
            ...doObj,
            [siName]: [...siArr, guName],
          },
        };
      }
    }),

  //filteredRegion 초기화
  resetAddress: () => set({ filteredRegions: {} }),

  // selectedDongNames에 배열 연결
  setSelectedDongNames: (nameArr: string[]) => set({ selectedDongNames: nameArr }),

  // selectedDongNames에서 요소(dong 이름) 제거
  removeDongFromArray: (dong: string) =>
    set((state) => ({ selectedDongNames: state.selectedDongNames.filter((x) => x !== dong) })),
}));

export default useRegionFilterStore;
