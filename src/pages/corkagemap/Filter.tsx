import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/shared/components/filter/Header';
import TopButtonContainer from '@/shared/components/filter/TopButtonContainer';
import Options from '@/shared/components/filter/Options';
import BottomButtonContainer from '@/shared/components/filter/BottomButtonContainer';
import RegionFilter from '@/shared/components/filter/RegionFilter';
import CorkageFilterButton from '@/shared/components/filter/CorkageFilterButton';
import { postFilterData } from '@/shared/apis/restaurant/restaurantApi';
import type { FilterRequest } from '@/shared/types/filter';

const CORKAGE_TYPE_MAP: { [key: string]: string } = {
  콜키지프리: 'FREE',
  병당: 'PER_BOTTLE',
  테이블당: 'PER_TABLE',
  인당: 'PER_PERSON',
  다중: 'MULTIPLE',
};

const OPTION_TYPE_MAP: { [key: string]: string } = {
  잔제공: 'GLASS_PROVIDED',
  얼음제공: 'ICE_PROVIDED',
  '한병 무료': 'ONE_BOTTLE_FREE',
  두병무료: 'TWO_BOTTLE_FREE',
};

const initialCorkageState = {
  range: [0, 5] as [number, number],
  range2: [0, 50000] as [number, number],
  range3: [0, 50000] as [number, number],
  range4: [0, 50000] as [number, number],
  selectedCorkageTypes: [] as string[],
  selectedOptionsTypes: [] as string[],
};

const Filter = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'corkage' | 'region'>('corkage');

  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [selectedDongs, setSelectedDongs] = useState<string[]>([]);

  // 콜키지 필터 상태 (Options 컴포넌트에서 사용하던 상태들을 모두 여기로 이동)
  const [range, setRange] = useState<[number, number]>(initialCorkageState.range);
  const [range2, setRange2] = useState<[number, number]>(initialCorkageState.range2);
  const [range3, setRange3] = useState<[number, number]>(initialCorkageState.range3);
  const [range4, setRange4] = useState<[number, number]>(initialCorkageState.range4);
  const [selectedCorkageTypes, setSelectedCorkageTypes] = useState<string[]>(
    initialCorkageState.selectedCorkageTypes
  );
  const [selectedOptionsTypes, setSelectedOptionsTypes] = useState<string[]>(
    initialCorkageState.selectedOptionsTypes
  );

  // 가격 슬라이더 활성화 여부 계산 (Options 컴포넌트와 동일한 로직)
  const isPriceEnabled = useMemo(() => {
    const hasSpecific =
      selectedCorkageTypes.includes('병당') ||
      selectedCorkageTypes.includes('인당') ||
      selectedCorkageTypes.includes('테이블당');
    if (!hasSpecific) return { bottle: false, person: false, table: false };
    return {
      bottle: selectedCorkageTypes.includes('병당'),
      person: selectedCorkageTypes.includes('인당'),
      table: selectedCorkageTypes.includes('테이블당'),
    };
  }, [selectedCorkageTypes]);

  // "적용하기" 버튼 클릭 시 실행될 함수
  const handleApplyFilter = async () => {
    // 1. API 요청에 맞게 데이터 변환
    const requestBody: FilterRequest = {
      minScore: range[0],
      maxScore: range[1],
      minBottlePrice: isPriceEnabled.bottle ? range2[0] : null,
      maxBottlePrice: isPriceEnabled.bottle ? range2[1] : null,
      minTablePrice: isPriceEnabled.table ? range3[0] : null,
      maxTablePrice: isPriceEnabled.table ? range3[1] : null,
      minPersonPrice: isPriceEnabled.person ? range4[0] : null,
      maxPersonPrice: isPriceEnabled.person ? range4[1] : null,
      corkageTypes: selectedCorkageTypes.map((type) => CORKAGE_TYPE_MAP[type]),
      optionTypes: selectedOptionsTypes.map((type) => OPTION_TYPE_MAP[type]),
    };

    // 2. API 호출
    try {
      const res = await postFilterData(requestBody);
      console.log('필터 결과:', res.data);
      // 3. 결과 페이지로 이동 (state와 함께 데이터 전달)
      navigate('/corkagemap/filter/result', { state: { restaurants: res.data } });
    } catch (err) {
      console.error('필터 API 호출 실패:', err);
      // TODO: 사용자에게 에러 발생을 알리는 UI 처리 (예: 토스트 메시지)
    }
  };

  // "초기화" 버튼 클릭 시 실행될 함수
  const handleResetFilter = () => {
    setRange(initialCorkageState.range);
    setRange2(initialCorkageState.range2);
    setRange3(initialCorkageState.range3);
    setRange4(initialCorkageState.range4);
    setSelectedCorkageTypes(initialCorkageState.selectedCorkageTypes);
    setSelectedOptionsTypes(initialCorkageState.selectedOptionsTypes);
  };

  return (
    <main className="relative flex h-screen flex-col items-center">
      <Header />
      <TopButtonContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'corkage' ? (
        <>
          {/*스크롤 가능한 필터 내용 영역 시작 */}
          <div className="w-full flex-1 overflow-y-auto pb-[120px]">
            <Options
              range={range}
              setRange={setRange}
              range2={range2}
              setRange2={setRange2}
              range3={range3}
              setRange3={setRange3}
              range4={range4}
              setRange4={setRange4}
              selectedCorkageTypes={selectedCorkageTypes}
              setSelectedCorkageTypes={setSelectedCorkageTypes}
              selectedOptionsTypes={selectedOptionsTypes}
              setSelectedOptionsTypes={setSelectedOptionsTypes}
            />
          </div>
          <div
            className="pointer-events-none absolute bottom-0 h-[20.3vh] w-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 4%, #FFF 63.5%)',
            }}
          ></div>
          <CorkageFilterButton onApply={handleApplyFilter} onReset={handleResetFilter} />
        </>
      ) : (
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
            selectedSido={selectedSido}
            selectedSigungu={selectedSigungu}
            selectedDongs={selectedDongs}
          />
        </>
      )}
    </main>
  );
};

export default Filter;
