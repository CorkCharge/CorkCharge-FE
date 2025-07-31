import { useState, useEffect, useId } from 'react';

import { cn } from '@/shared/utils/utils';

interface StarProps {
  rate: number;
  className?: string;
}
export const StarRate = ({ rate, className }: StarProps) => {
  const STARIDX = ['first', 'second', 'third', 'fourth', 'fifth'];
  const compId = useId(); // 컴포넌트 별 id 생성
  const [rateArr, setRateArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const calcRate = (rate: number) => {
      const num = Math.floor(rate);
      const float = rate % 1;
      const tempArr = [0, 0, 0, 0, 0];

      for (let i = 0; i < num; i++) {
        tempArr[i] = 14;
      }
      tempArr[num] = 14 * float;
      setRateArr(tempArr);
    };
    calcRate(rate);
  }, [rate]);

  return (
    <div className={cn('flex items-center', className)}>
      {STARIDX.map((item, idx) => (
        <span className="inline-flex" key={idx}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 14 13"
            fill="transparent"
          >
            <clipPath id={`${compId}-${item}`}>
              <rect width={rateArr[idx]} height="18" />
            </clipPath>
            <path
              id={`${compId}-${item}star`}
              d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
              transform="translate(-2 -2)"
            />
            <use
              clipPath={`url(#${compId}-${item})`}
              href={`#${compId}-${item}star`}
              fill="#E75257"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};
