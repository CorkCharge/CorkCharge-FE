import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PageIdxType = -1 | 0 | 1 | 2;
interface RegionFilterProps {
  // -1: 초기값, 0: 신규매장, 1: 콜키지 리뷰, 2: 해주세요
  whichPage: PageIdxType;
  filteredRegions: RegionTree;
  selectedDongNames: string[];
  deleteByDong: (_: string) => void;
  toggleAddress: (_do: string, _si: string, _gu: string) => void;
  resetAddress: () => void;
  setSelectedDongNames: (_: string[]) => void;
  removeDongFromArray: (_: string) => void;
  setWhichPage: (_: PageIdxType) => void;
}

interface RegionTree {
  [doname: string]: {
    [siname: string]: string[];
  };
}

const useRegionFilterStore = create<RegionFilterProps>()(
  devtools(
    (set, get) => ({
      // 어느 페이지에서 선택한 주소인가
      whichPage: -1,
      // 도 - 시 - 동 관리
      filteredRegions: {},
      // 동이름 배열
      selectedDongNames: [],

      // filteredRegions에서 dong이름으로 제거 (미사용: 제거 예정)
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
          const doObj = state.filteredRegions[doName] || {};
          const siArr = doObj[siName] || [];

          // 3주소를 가지고 있는 경우
          if (siArr.includes(guName)) {
            // 새로운 객체 생성
            const newRegions = { ...state.filteredRegions };
            newRegions[doName] = { ...doObj };
            newRegions[doName][siName] = siArr.filter((x) => x !== guName);

            if (newRegions[doName][siName].length === 0) {
              delete newRegions[doName][siName];
            }
            if (Object.keys(newRegions[doName]).length === 0) {
              delete newRegions[doName];
            }
            return { filteredRegions: newRegions };
          }

          // 3주소가 없는 경우
          return {
            filteredRegions: {
              ...state.filteredRegions,
              [doName]: {
                ...doObj,
                [siName]: [...siArr, guName],
              },
            },
          };
        }),

      //filteredRegion 초기화
      resetAddress: () => set({ filteredRegions: {} }),

      // selectedDongNames에 배열 연결
      setSelectedDongNames: (nameArr: string[]) => set({ selectedDongNames: nameArr }),

      // selectedDongNames filteredRegion에서 요소(dong 이름) 제거
      removeDongFromArray: (dong: string) =>
        set((state) => {
          const newRegions = { ...state.filteredRegions };
          for (const doName of Object.keys(newRegions)) {
            for (const siName of Object.keys(newRegions[doName])) {
              newRegions[doName][siName] = newRegions[doName][siName].filter((x) => x !== dong);

              if (newRegions[doName][siName].length === 0) delete newRegions[doName][siName];
            }

            if (Object.keys(newRegions[doName]).length === 0) delete newRegions[doName];
          }

          return {
            selectedDongNames: state.selectedDongNames.filter((x) => x !== dong),
            filteredRegions: newRegions,
          };
        }),

      setWhichPage: (pageIdx: PageIdxType) => set({ whichPage: pageIdx }),
    }),
    { name: 'temp' }
  )
);

export default useRegionFilterStore;
