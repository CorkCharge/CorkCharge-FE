import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Header from '@/shared/components/common/Header';
// import { SearchInput } from '@/shared/components/common/Input';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';
import RegionSelector from '@/shared/components/home/RegionSelector';

const HomeRegionFilter = () => {
  const navigate = useNavigate();

  const resetAddress = useRegionFilterStore((state) => state.resetAddress);
  const setSelectedDongNames = useRegionFilterStore((state) => state.setSelectedDongNames);

  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [selectedDongs, setSelectedDongs] = useState<string[]>([]);

  const applyFilter = () => {
    // toggleAddress()
    setSelectedDongNames(selectedDongs);
    navigate(-1);
  };

  const handleReset = () => {
    setSelectedSido(null);
    setSelectedSigungu(null);
    setSelectedDongs([]);
    resetAddress();
  };

  return (
    <div className="px-4">
      <Header title="지역설정" type="back" backFn={() => navigate(-1)} />
      {/* <SearchInput placeholder="지역명을 검색하세요" className="text-sm font-medium" /> */}
      <>
        <RegionSelector
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          selectedSigungu={selectedSigungu}
          setSelectedSigungu={setSelectedSigungu}
          selectedDongs={selectedDongs}
          setSelectedDongs={setSelectedDongs}
        />
        <div
          className="fixed bottom-[70px] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center gap-3 px-4"
          style={{ maxWidth: 'var(--app-width)' }}
        >
          <button
            onClick={handleReset}
            className="mr-2 h-12 flex-1 rounded-lg border bg-[var(--gray-1)] py-2 font-bold"
          >
            취소
          </button>
          <button
            onClick={applyFilter}
            className="h-12 flex-1 rounded-lg bg-[var(--primary)] py-2 font-bold text-white"
          >
            확인
          </button>
        </div>
      </>
    </div>
  );
};
export default HomeRegionFilter;
