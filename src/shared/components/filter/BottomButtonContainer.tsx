import { useNavigate } from 'react-router-dom';
import { fetchFilteredRegion, type Restaurant } from '../../apis/restaurant/filterRegion';

interface BottomButtonContainerProps {
  selectedSido: string | null;
  selectedSigungu: string | null;
  selectedDongs: string[];

  filterType?: 'map' | 'hot';
  handleReset: () => void;
  onApply?: (data: Restaurant[]) => void; // 선택적 onApply prop 추가
}

const BottomButtonContainer = ({
  selectedSido,
  selectedSigungu,
  selectedDongs,
  filterType,
  handleReset,
  onApply,
}: BottomButtonContainerProps) => {
  const navigate = useNavigate();
  const handleApplyClick = async () => {
    try {
      const res = await fetchFilteredRegion({
        type: filterType ?? 'map',
        sido: selectedSido ?? undefined,
        sigungu: selectedSigungu ?? undefined,
        dong: selectedDongs.length > 0 ? selectedDongs : undefined,
      });
      const restaurantsData = Array.isArray(res.data) ? res.data : res.data.restaurants;

      if (onApply) {
        onApply(restaurantsData);
      } else {
        navigate('/corkagemap/filter/result', { state: { restaurants: res.data } });
      }
    } catch (err) {
      console.error('API 호출 실패', err);
    }
  };

  return (
    <div
      className="fixed bottom-[3.169%] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center gap-[3.53%]"
      style={{ maxWidth: 'var(--app-width)' }}
    >
      <button
        onClick={() => {
          console.log('초기화 클릭');
          handleReset();
        }}
        className="mr-2 h-[48px] w-[35%] rounded-lg border bg-[#F3F3F6] py-2 font-bold"
      >
        초기화
      </button>
      <button
        onClick={handleApplyClick}
        className="h-[48px] w-[53.28%] rounded-lg bg-[#90212A] py-2 font-bold text-white"
      >
        적용하기
      </button>
    </div>
  );
};

export default BottomButtonContainer;
