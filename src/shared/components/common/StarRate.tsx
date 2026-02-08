import { useState, useEffect, useId } from 'react';

import { cn } from '@/shared/utils/utils';

interface StarProps {
  rate: number;
  isEditable?: boolean;
  className?: string;
  starRating?: (_: number) => void;
  spacing?: string;
  width?: string;
  height?: string;
}
export const StarRate = ({
  rate,
  isEditable = false,
  starRating,
  spacing,
  width,
  height,
  className,
}: StarProps) => {
  const STARIDX = ['first', 'second', 'third', 'fourth', 'fifth'];
  const compId = useId(); // 컴포넌트 별 id 생성
  const [rateArr, setRateArr] = useState([0, 0, 0, 0, 0]);
  const [hoverIdx, setHoverIdx] = useState(-1); // 마우스가 hover된 index
  const [clickIdx, setClickIdx] = useState(-1); // 클릭한 index

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

  const setHoverFill = (idx: number) => setHoverIdx(idx);
  const handleClick = (idx: number) => {
    setClickIdx(idx);
    if (starRating) starRating(idx + 1);
  };

  return (
    <div className={cn('flex items-center', className)} style={{ gap: spacing }}>
      {STARIDX.map((item, idx) => (
        <span className={cn('mr-3px inline-flex')} key={idx}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? '20'}
            height={height ?? '18'}
            viewBox="0 0 14 13"
            fill={isEditable ? 'var(--gray-4)' : 'transparent'}
            onClick={isEditable ? () => handleClick(idx) : undefined}
            onMouseEnter={isEditable ? () => setHoverFill(idx) : undefined}
            onMouseLeave={isEditable ? () => setHoverFill(clickIdx) : undefined}
          >
            <clipPath id={`${compId}-${item}`}>
              {isEditable ? (
                <rect width={idx <= hoverIdx ? 14 : 0} height="18" />
              ) : (
                <rect width={rateArr[idx]} height="18" />
              )}
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
              stroke="none"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

export const StarWithStroke = ({
  rate,
  isEditable = false,
  starRating,
  spacing,
  width,
  height,
  className,
}: StarProps) => {
  const compId = useId();
  const STAR_IDXS = [0, 1, 2, 3, 4];

  const [hoverIdx, setHoverIdx] = useState(-1);
  const [clickIdx, setClickIdx] = useState(-1);

  const num = Math.floor(rate);
  const float = rate % 1;
  const rateArr = STAR_IDXS.map((_, i) => {
    if (i < num) return 16;
    if (i === num) return 14 * float;
    return 0;
  });

  const setHoverFill = (idx: number) => {
    if (isEditable) setHoverIdx(idx);
  };

  const handleMouseLeave = () => {
    if (isEditable) setHoverIdx(clickIdx);
  };

  const handleClick = (idx: number) => {
    if (!isEditable) return;
    setClickIdx(idx);
    if (starRating) starRating(idx + 1);
  };

  return (
    <div className={cn('flex items-center', className)} style={{ gap: spacing }}>
      {STAR_IDXS.map((idx) => (
        <span
          className={cn('inline-flex', isEditable && 'cursor-pointer')}
          key={idx}
          onClick={() => handleClick(idx)}
          onMouseEnter={() => setHoverFill(idx)}
          onMouseLeave={handleMouseLeave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? '20'}
            height={height ?? '18'}
            viewBox="0 0 14 13"
            className="overflow-visible"
            fill="none"
          >
            <defs>
              <clipPath id={`${compId}-clip-${idx}`}>
                {isEditable ? (
                  <rect width={idx <= hoverIdx ? 14 : 0} height="18" />
                ) : (
                  <rect width={rateArr[idx]} height="18" />
                )}
              </clipPath>
            </defs>

            <path
              id={`${compId}-${idx}star`}
              d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
              transform="translate(-2 -2)"
              fill="none"
              stroke="#E75257"
              strokeWidth={0.8}
              strokeLinejoin="round"
            />

            <path
              d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
              transform="translate(-2 -2)"
              fill="#E75257"
              stroke="#E75257"
              clipPath={`url(#${compId}-clip-${idx})`}
              strokeWidth={0.8}
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};
