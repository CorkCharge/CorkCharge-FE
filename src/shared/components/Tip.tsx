import type { Selected, tipCategory } from '@/shared/components//home/type';
import './tip.css';

type TipProps = {
  selected: Selected;
  setSelected: (v: Selected) => void;
};

const Tip = ({ selected, setSelected }: TipProps) => {
  const is = (v: Selected | tipCategory) => selected === v;

  return (
    <div className="flex w-full gap-1 overflow-auto">
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
