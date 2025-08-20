import { useNavigate } from 'react-router-dom';
import { fetchFilteredRegion } from '../../apis/restaurant/filterRegion';

interface BottomButtonContainerProps {
  selectedSido: string | null;
  selectedSigungu: string | null;
  selectedDongs: string[];
}

const BottomButtonContainer = ({
  selectedSido,
  selectedSigungu,
  selectedDongs,
}: BottomButtonContainerProps) => {
  const navigate = useNavigate();
  const handleApplyClick = async () => {
    try {
      const res = await fetchFilteredRegion({
        type: 'map',
        sido: selectedSido ?? undefined,
        sigungu: selectedSigungu ?? undefined,
        dong: selectedDongs.length > 0 ? selectedDongs : undefined,
      });
      console.log('넘어갈 data 배열:', res.data);
      navigate('/corkagemap/filter/result', { state: { restaurants: res.data } });
    } catch (err) {
      console.error('API 호출 실패', err);
    }
  };

  return (
    <div className="fixed bottom-[3.169%] z-10 flex w-full justify-center gap-[3.53%] pb-[50px]">
      <button
        onClick={() => console.log('초기화 클릭')}
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
