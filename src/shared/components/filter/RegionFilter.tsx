import rawRegions from '@/shared/constants/regionssss.json';

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

const RegionFilter = ({
  selectedSido,
  selectedSigungu,
  selectedDongs,
  setSelectedSido,
  setSelectedSigungu,
  setSelectedDongs,
}: RegionFilterProps) => {
  const handleDongSelect = (dong: string) => {
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
      <div className="mt-4 grid h-[40px] w-[393px] grid-cols-[81px_156px_156px] border-[0.5px] border-[#C5C8CF] bg-[#ECEDEF] font-[#35353F] text-[14px]">
        <div className="flex items-center justify-center border-r-[0.6px] border-[#C5C8CF]">
          시 · 도
        </div>
        <div className="flex items-center justify-center border-r-[0.6px] border-[#C5C8CF]">
          시 · 군 · 구{' '}
        </div>
        <div className="flex items-center justify-center">동 · 읍 · 면</div>
      </div>
      <div className="flex border-b text-sm">
        <div className="w-[81px] overflow-y-auto border-r">
          {Object.keys(regions).map((sido) => (
            <div
              key={sido}
              onClick={() => {
                setSelectedSido(sido);
                setSelectedSigungu(null);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selectedSido === sido ? 'bg-[#90212A] font-semibold text-white' : ''
              }`}
            >
              {sido}
            </div>
          ))}
        </div>

        <div className="w-[156px] overflow-y-auto border-r">
          {selectedSido &&
            Object.keys(regions[selectedSido]).map((sigungu) => (
              <div
                key={sigungu}
                onClick={() => setSelectedSigungu(sigungu)}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  selectedSigungu === sigungu ? 'bg-[#90214626] font-semibold text-[#90212A]' : ''
                }`}
              >
                {sigungu}
              </div>
            ))}
        </div>

        <div className="w-[156px] overflow-y-auto">
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
        <div className="fixed bottom-12 h-[190px] w-full bg-white shadow-[0_-1px_12px_-1px_rgba(0,0,0,0.2)]">
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

export default RegionFilter;
