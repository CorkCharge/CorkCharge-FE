import { useEffect, useRef, useState } from 'react';

import type { Selected, tipCategory } from '@/shared/components/home/home.types';
import './tip.css';
import { cn } from '../utils/utils';

type TipProps = {
  selected: Selected;
  setSelected: (_: Selected) => void;
  className?: string;
};

const Tip = ({ selected, setSelected, className }: TipProps) => {
  const is = (v: Selected | tipCategory) => selected === v;

  const ref = useRef<HTMLDivElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);

  // 좌우 overflow 감지
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const checkOverflow = () => {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div
      className={cn(
        `mt-4 flex gap-1 px-4 ${isOverflow ? 'justify-start overflow-auto' : 'justify-center'}`,
        className
      )}
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setSelected('ALL')}
        className={`button ${is('ALL') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        전체
      </button>

      <button
        type="button"
        onClick={() => setSelected('CORKAGE')}
        className={`button ${is('CORKAGE') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        콜키지 팁
      </button>

      <button
        type="button"
        onClick={() => setSelected('PAIRING')}
        className={`button ${is('PAIRING') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        페어링 큐레이션
      </button>

      <button
        type="button"
        onClick={() => setSelected('EVENT')}
        className={`button ${is('EVENT') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        EVENT
      </button>
    </div>
  );
};

export default Tip;
