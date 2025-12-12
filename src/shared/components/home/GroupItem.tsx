import { useState } from 'react';

// SaveMarker icons (small)
import SaveMarker1 from '@/pages/corkagemap/list/savemarker/SaveMarker1.svg';
import SaveMarker2 from '@/pages/corkagemap/list/savemarker/SaveMarker2.svg';
import SaveMarker3 from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import SaveMarker4 from '@/pages/corkagemap/list/savemarker/SaveMarker4.svg';
import SaveMarker5 from '@/pages/corkagemap/list/savemarker/SaveMarker5.svg';
import SaveMarker6 from '@/pages/corkagemap/list/savemarker/SaveMarker6.svg';
import SaveMarker7 from '@/pages/corkagemap/list/savemarker/SaveMarker7.svg';
import SaveMarker8 from '@/pages/corkagemap/list/savemarker/SaveMarker8.svg';
import SaveMarker9 from '@/pages/corkagemap/list/savemarker/SaveMarker9.svg';
import SaveMarker10 from '@/pages/corkagemap/list/savemarker/SaveMarker10.svg';
import SaveMarker11 from '@/pages/corkagemap/list/savemarker/SaveMarker11.svg';
import SaveMarker12 from '@/pages/corkagemap/list/savemarker/SaveMarker12.svg';

const smallMarkers: Record<string, string> = {
  SaveMarker1,
  SaveMarker2,
  SaveMarker3,
  SaveMarker4,
  SaveMarker5,
  SaveMarker6,
  SaveMarker7,
  SaveMarker8,
  SaveMarker9,
  SaveMarker10,
  SaveMarker11,
  SaveMarker12,
};

type MyGroupProps = {
  id: number;
  iconName: string;
  name: string;
  count: number;
  checked: boolean;
};

const GroupItem = ({ id, iconName, name, count, checked }: MyGroupProps) => {
  const IconSrc = smallMarkers[iconName];

  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="relative flex w-full items-center border-b border-[#DBDDE1] py-4">
      {IconSrc && <img src={IconSrc} alt={iconName} className="h-[23px] w-[23px]" />}
      <span className="ml-[12px] text-[14px] font-[500] text-[#35353F]">{name}</span>
      <span className="ml-[8px] text-[12px] font-[500] text-[#9FA2AA]">{count}</span>

      <div className="absolute right-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => setIsChecked((prev) => !prev)}
        >
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="9.5"
            fill={isChecked ? 'var(--primary)' : 'transparent'}
            stroke={isChecked ? 'transparent' : 'var(--gray-4)'}
            strokeWidth="1"
          />
          <path
            d="M6 9.18182L9.13142 12.5979C9.32959 12.8141 9.67041 12.8141 9.86858 12.5979L15 7"
            stroke={isChecked ? 'white' : 'var(--gray-4)'}
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default GroupItem;
