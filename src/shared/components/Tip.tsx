import type { Selected, tipCategory } from '@/shared/components//home/type';
import './tip.css';

type TipProps = {
  value: Selected;
  onChange: (v: Selected) => void;
};

const Tip = ({ value, onChange }: TipProps) => {
  const is = (v: Selected | tipCategory) => value === v;

  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={() => onChange('ALL')}
        className={`button ${is('ALL') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        전체
      </button>

      <button
        type="button"
        onClick={() => onChange('CORKAGE')}
        className={`button ${is('CORKAGE') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        콜키지 팁
      </button>

      <button
        type="button"
        onClick={() => onChange('PAIRING')}
        className={`button ${is('PAIRING') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        페어링 큐레이션
      </button>

      <button
        type="button"
        onClick={() => onChange('EVENT')}
        className={`button ${is('EVENT') ? 'bg-[#90212A] text-white' : 'bg-[#f3f3f6] text-[#35353F]'}`}
      >
        EVENT
      </button>
    </div>
  );
};

export default Tip;
