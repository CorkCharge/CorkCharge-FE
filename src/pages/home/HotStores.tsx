import type { Restaurant } from '@/shared/apis/restaurant/filterRegion';
import { useState } from 'react';
import HotStoreList from '../../shared/components/HotStoreList';
import TopBar from '../../shared/components/TopBar';
import RegionSearchBar from '../../shared/components/corkScore/RegionSearchBar';
import BottomButtonContainer from '../../shared/components/filter/BottomButtonContainer';
import RegionFilter from '../../shared/components/filter/RegionFilter';
import type { HotRestaurant } from '@/shared/apis/restaurant/hotStoreApi';

const HotStores = () => {
  // 지역 필터 상태
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [selectedDongs, setSelectedDongs] = useState<string[]>([]);

  // 필터 상태 추가
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // 지역 필터 적용 함수
  const handleApplyRegionFilter = async (data: Restaurant[]) => {
    console.log('HotStores에서 받은 데이터:', data);
    if (data && Array.isArray(data)) {
      console.log('데이터 길이:', data.length);
      setFilteredRestaurants(data);
      setIsFiltered(true);
      setShowRegionFilter(false);
    } else {
      console.error('유효하지 않은 데이터:', data);
    }
  };

  // 필터 초기화 함수
  const handleResetFilter = () => {
    setFilteredRestaurants([]);
    setIsFiltered(false);
  };

  const handleReset = () => {
    // setShowRegionFilter(false);

    setSelectedSido(null);
    setSelectedSigungu(null);
    setSelectedDongs([]);
    setFilteredRestaurants([]);
    setIsFiltered(false);
  };

  return (
    <div className="flex flex-col items-center">
      <TopBar text="지금 핫한 매장" />

      {/* 지역 필터가 활성화된 경우 */}
      {showRegionFilter ? (
        <>
          <RegionFilter
            selectedSido={selectedSido}
            selectedSigungu={selectedSigungu}
            selectedDongs={selectedDongs}
            setSelectedSido={setSelectedSido}
            setSelectedSigungu={setSelectedSigungu}
            setSelectedDongs={setSelectedDongs}
          />
          <BottomButtonContainer
            filterType="hot"
            selectedSido={selectedSido}
            selectedSigungu={selectedSigungu}
            selectedDongs={selectedDongs}
            handleReset={handleReset}
            onApply={handleApplyRegionFilter}
          />
        </>
      ) : (
        <>
          {/* 필터링된 데이터가 있으면 필터 결과를, 없으면 기본 리스트를 표시 */}
          {isFiltered ? (
            <div className="flex w-full flex-col items-center">
              {/* 필터 결과 헤더 */}
              <div className="flex w-[393px] items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-600">
                  필터 결과 ({filteredRestaurants.length}개)
                </span>
                <button onClick={handleResetFilter} className="text-sm text-blue-500 underline">
                  필터 초기화
                </button>
              </div>

              {/* HotStoreList를 사용해서 필터된 결과 표시 */}
              <HotStoreList filteredData={filteredRestaurants} />
            </div>
          ) : (
            <HotStoreList />
          )}

          <RegionSearchBar onClick={() => setShowRegionFilter(true)} />
        </>
      )}
    </div>
  );
};

export default HotStores;
