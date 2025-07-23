import { useEffect, useState } from 'react';

import wine from '@/shared/components/onBoarding/images/selectOption/wine-select.png';
import beer from '@/shared/components/onBoarding/images/selectOption/beer-select.png';
import whiskey from '@/shared/components/onBoarding/images/selectOption/whiskey-select.png';
import soju from '@/shared/components/onBoarding/images/selectOption/soju-select.png';
import sake from '@/shared/components/onBoarding/images/selectOption/sake-select.png';
import cocktail from '@/shared/components/onBoarding/images/selectOption/cocktail-select.png';
import distilled from '@/shared/components/onBoarding/images/selectOption/distilled-select.png';
import Button from '../common/Button';

const OPTIONS = [wine, beer, whiskey, soju, sake, cocktail, distilled];

function PreferDrink({ onNext }: { onNext: React.Dispatch<React.SetStateAction<number>> }) {
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
      <div key={idx} className="relative">
        <img src={option} className="h-[104px] w-full" onClick={() => toggleCard(idx)} />
        {selectedIdx.includes(idx) && (
          <div
            className="absolute left-0 right-0 top-0 h-[104px] w-full rounded-lg bg-[rgba(116,151,85,0.75)]"
            onClick={() => toggleCard(idx)}
          ></div>
        )}
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
          className={`h-full ${selectedIdx.length > 0 ? 'w-[50%]' : 'w-[1%]'} rounded-[4.5px] bg-[var(--primary)]`}
        ></div>
      </div>
      <h1 className="mt-10 text-center text-3xl font-bold">당신의 잔에 담고 싶은 건?</h1>
      <h2 className="mb-6 mt-6 text-center text-lg font-medium text-[#585A68]">(복수 선택 가능)</h2>
      <div className="mx-auto grid w-[95%] grid-cols-2 gap-x-2 gap-y-4">{renderSelect()}</div>
      {selectedIdx.length > 0 && (
        <div
          className={`mx-auto mt-10 w-full max-w-[600px] text-center ${!isSmallView ? 'fixed bottom-8' : 'mb-3'}`}
        >
          <Button
            value="다음"
            className={`w-[80%] ${isSmallView && 'mb-8'}`}
            onClick={() => onNext((prev) => prev + 1)}
          />
        </div>
      )}
    </main>
  );
}

export default PreferDrink;
