import { useEffect, useState } from 'react';

import Button from '../common/Button';
import koreanFood from '@/shared/components/onBoarding/images/selectOption/korean-food-select.png';
import asianFood from '@/shared/components/onBoarding/images/selectOption/asian-food-select.png';
import chicken from '@/shared/components/onBoarding/images/selectOption/chicken-select.png';
import chineseFood from '@/shared/components/onBoarding/images/selectOption/chinese-food-select.png';
import dessert from '@/shared/components/onBoarding/images/selectOption/dessert-select.png';
import fastfood from '@/shared/components/onBoarding/images/selectOption/fastfood-select.png';
import flourFood from '@/shared/components/onBoarding/images/selectOption/flour-food-select.png';
import japaneseFood from '@/shared/components/onBoarding/images/selectOption/japanese-food-select.png';
import jokbal from '@/shared/components/onBoarding/images/selectOption/jokbal-select.png';
import meat from '@/shared/components/onBoarding/images/selectOption/meat-select.png';
import salad from '@/shared/components/onBoarding/images/selectOption/salad-select.png';
import westernFood from '@/shared/components/onBoarding/images/selectOption/western-food-select.png';

const OPTIONS = [
  { title: '한식', image: koreanFood },
  { title: '중식', image: chineseFood },
  { title: '일식', image: japaneseFood },
  { title: '양식', image: westernFood },
  { title: '아시아 음식', image: asianFood },
  { title: '디저트', image: dessert },
  { title: '패스트 푸드', image: fastfood },
  { title: '분식', image: flourFood },
  { title: '샐러드 & 헬스 푸드', image: salad },
  { title: '고기', image: meat },
  { title: '치킨', image: chicken },
  { title: '족발 & 보쌈', image: jokbal },
];

function PreferMenu({ onNext }: { onNext: () => void }) {
  const [isSmallView, setIsSmallView] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  useEffect(() => {
    checkView();
    window.addEventListener('resize', checkView);
    return () => window.removeEventListener('resize', checkView);
  }, []);

  const checkView = () => setIsSmallView(window.innerWidth < 405);

  const renderSelect = () =>
    OPTIONS.map((option, idx) => (
      <div
        className={`button-shadow flex gap-2 rounded-xl ${selectedIdx.includes(idx) ? 'bg-[rgba(144,33,70,0.15)]' : 'bg-white'} px-5 py-3`}
        key={idx}
        onClick={() => toggleCard(idx)}
      >
        <img src={option.image} className="h-[22px] w-[17px]" />
        <span className="whitespace-nowrap font-semibold">{option.title}</span>
      </div>
    ));

  const toggleCard = (idx: number) => {
    if (selectedIdx.includes(idx)) setSelectedIdx((prev) => prev.filter((x) => x !== idx));
    else setSelectedIdx((prev) => [...prev, idx]);
    console.log(selectedIdx);
  };

  return (
    <main>
      <div
        className="mx-auto mt-[60px] h-[6px] w-[90%] rounded-[4.5px]"
        style={{ boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1) inset' }}
      >
        <div
          className={`h-full ${selectedIdx.length > 0 ? 'w-[100%]' : 'w-[50%]'} rounded-[4.5px] bg-[var(--primary)]`}
        ></div>
      </div>
      <h1 className="mt-10 text-center text-3xl font-bold">요즘 자주 생각나는 메뉴는?</h1>
      <h2 className="mb-6 mt-6 text-center text-lg font-medium text-[#585A68]">(복수 선택 가능)</h2>
      <div className="mx-auto flex w-[90%] flex-wrap gap-[10px]">{renderSelect()}</div>
      {selectedIdx.length > 0 && (
        <div
          className={`mx-auto mt-10 w-full max-w-[600px] text-center ${!isSmallView ? 'fixed bottom-8' : 'mb-3'}`}
        >
          <Button value="다음" className={`w-[80%] ${isSmallView && 'mb-8'}`} onClick={onNext} />
        </div>
      )}
    </main>
  );
}

export default PreferMenu;
