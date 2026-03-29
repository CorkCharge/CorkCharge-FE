import rawRegions from '@/shared/constants/regionssss.json';
import useRegionFilterStore from '@/shared/store/useRegionFilterStore';

type RegionData = Record<string, Record<string, string[]>>;
const regions = rawRegions as RegionData;

interface RegionFilterProps {
  selectedSido: string | null;
  selectedSigungu: string | null;
  selectedDongs: string[];
  setSelectedSido: (_: string | null) => void;
  setSelectedSigungu: (_: string | null) => void;
  setSelectedDongs: (_: string[]) => void;
}

const RegionSelector = ({
  selectedSido,
  selectedSigungu,
  selectedDongs,
  setSelectedSido,
  setSelectedSigungu,
  setSelectedDongs,
}: RegionFilterProps) => {
  const toggleAddress = useRegionFilterStore((state) => state.toggleAddress);

  // 도 또는 시까지만 고른 경우
  const handleSelect = (name: string, type: 'do' | 'si') => {
    if (type === 'do') {
      toggleAddress(name, undefined, undefined);
    } else if (type === 'si') {
      toggleAddress(selectedSido!, name, undefined);
    }
  };

  // 동을 선택한 경우
  const handleDongSelect = (dong: string) => {
    if (!selectedSido || !selectedSigungu) return;

    toggleAddress(selectedSido, selectedSigungu, dong);

    if (selectedDongs.includes(dong)) {
      setSelectedDongs(selectedDongs.filter((d) => d !== dong));
    } else {
      if (selectedDongs.length < 10) {
        setSelectedDongs([...selectedDongs, dong]);
      }
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center overflow-y-auto pb-[120px]">
      <div
        className="mt-4 grid h-[40px] w-full border-[0.5px] border-[var(--gray-4)] bg-[var(--gray-2)] text-sm font-[var(--gray-8)]"
        style={{ gridTemplateColumns: '1fr 2fr 2fr' }}
      >
        <div className="flex items-center justify-center border-r-[0.6px] border-[var(--gray-4)]">
          시 · 도
        </div>
        <div className="flex items-center justify-center border-r-[0.6px] border-[#C5C8CF]">
          시 · 군 · 구{' '}
        </div>
        <div className="flex items-center justify-center">동 · 읍 · 면</div>
      </div>

      <div
        className="grid w-full border-b text-sm"
        style={{
          gridTemplateColumns: '1fr 2fr 2fr',
          marginBottom: selectedDongs.length > 0 ? '80px' : undefined,
        }}
      >
        <div className="overflow-y-auto border-r">
          {Object.keys(regions).map((sido) => (
            <div
              key={sido}
              onClick={() => {
                setSelectedSido(sido);
                setSelectedSigungu(null);
                handleSelect(sido, 'do');
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selectedSido === sido ? 'bg-[#90212A] font-semibold text-white' : ''
              }`}
            >
              {sido}
            </div>
          ))}
        </div>

        <div className="overflow-y-auto border-r">
          {selectedSido &&
            Object.keys(regions[selectedSido]).map((sigungu) => (
              <div
                key={sigungu}
                onClick={() => {
                  setSelectedSigungu(sigungu);
                  handleSelect(sigungu, 'si');
                }}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  selectedSigungu === sigungu ? 'bg-[#90214626] font-semibold text-[#90212A]' : ''
                }`}
              >
                {sigungu}
              </div>
            ))}
        </div>

        <div className="overflow-y-auto">
          {selectedSido &&
            selectedSigungu &&
            regions[selectedSido][selectedSigungu].map((dong) => (
              <div
                key={dong}
                onClick={() => handleDongSelect(dong)}
                className={`flex cursor-pointer justify-between px-4 py-2 hover:bg-gray-100 ${
                  selectedDongs.includes(dong) ? 'font-semibold text-[#90212A]' : ''
                }`}
              >
                {dong}
                {selectedDongs.includes(dong) && <span>✔</span>}
              </div>
            ))}
        </div>
      </div>

      {selectedDongs.length > 0 && (
        <div
          className="fixed bottom-12 h-[190px] w-full bg-white shadow-[0_-1px_12px_-1px_rgba(0,0,0,0.2)]"
          style={{ maxWidth: 'var(--app-width)' }}
        >
          <div className="flex flex-col gap-2 p-4">
            <div className="flex text-[12px]">{selectedDongs.length}/10</div>
            <div className="scrollbar-hide flex gap-2 overflow-x-auto whitespace-nowrap">
              {selectedDongs.map((hood) => (
                <span
                  key={hood}
                  className="flex h-[32px] items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[#90212A]"
                >
                  {hood}
                  <button onClick={() => setSelectedDongs(selectedDongs.filter((h) => h !== hood))}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
