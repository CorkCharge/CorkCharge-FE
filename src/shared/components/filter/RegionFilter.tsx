import { useState } from 'react';

const regions = [
  {
    name: '서울',
    districts: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
  },
  {
    name: '경기',
    districts: ['전체'],
  },
  { name: '인천', districts: [] },
  { name: '강원', districts: [] },
  { name: '대전', districts: [] },
  { name: '세종', districts: [] },
  { name: '충북', districts: [] },
  { name: '충남', districts: [] },
  { name: '부산', districts: [] },
  { name: '울산', districts: [] },
  { name: '경남', districts: [] },
  { name: '경북', districts: [] },
  { name: '대구', districts: [] },
  { name: '광주', districts: [] },
];

const neighborhoods: { [key: string]: string[] } = {
  강남구: ['삼성동', '송파동'],
  강동구: ['천호동'],
  강북구: [
    '강북구 전체',
    '미아동',
    '번동',
    '번1동',
    '번2동',
    '번3동',
    '삼각산동',
    '삼양동',
    '송중동',
    '송천동',
  ],
};

const RegionFilter = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  const handleNeighborhoodSelect = (hood: string) => {
    if (selectedNeighborhoods.includes(hood)) {
      setSelectedNeighborhoods(selectedNeighborhoods.filter((h) => h !== hood));
    } else {
      if (selectedNeighborhoods.length < 10) {
        setSelectedNeighborhoods([...selectedNeighborhoods, hood]);
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
          {regions.map((region) => (
            <div
              key={region.name}
              onClick={() => {
                setSelectedRegion(region.name);
                setSelectedDistrict(null);
                // setSelectedNeighborhoods([]);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selectedRegion === region.name ? 'bg-[#90212A] font-semibold text-white' : ''
              }`}
            >
              {region.name}
            </div>
          ))}
        </div>

        <div className="w-[156px] overflow-y-auto border-r">
          {selectedRegion &&
            regions
              .find((r) => r.name === selectedRegion)
              ?.districts.map((d) => (
                <div
                  key={d}
                  onClick={() => {
                    setSelectedDistrict(d);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    selectedDistrict === d ? 'bg-[#90214626] font-semibold text-[#90212A]' : ''
                  }`}
                >
                  {d}
                </div>
              ))}
        </div>

        <div className="max-h-[300px] w-[156px] overflow-y-auto">
          {selectedDistrict &&
            neighborhoods[selectedDistrict]?.map((hood) => (
              <div
                key={hood}
                onClick={() => handleNeighborhoodSelect(hood)}
                className={`flex cursor-pointer justify-between px-4 py-2 hover:bg-gray-100 ${
                  selectedNeighborhoods.includes(hood) ? 'font-semibold text-[#90212A]' : ''
                }`}
              >
                {hood}
                {selectedNeighborhoods.includes(hood) && <span>✔</span>}
              </div>
            ))}
        </div>
      </div>

      {selectedNeighborhoods.length > 0 && (
        <div className="fixed bottom-0 h-[190px] w-[393px] bg-white shadow-[0_-1px_12px_-1px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex text-[12px]">{selectedNeighborhoods.length}/10</div>
            <div className="scrollbar-hide flex gap-2 overflow-x-auto whitespace-nowrap">
              {selectedNeighborhoods.map((hood) => (
                <span
                  key={hood}
                  className="flex h-[32px] items-center gap-1 rounded-lg bg-[#90214626] px-2 py-1 text-[12px] font-semibold text-[#90212A]"
                >
                  {hood}
                  <button
                    onClick={() =>
                      setSelectedNeighborhoods(selectedNeighborhoods.filter((h) => h !== hood))
                    }
                  >
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
