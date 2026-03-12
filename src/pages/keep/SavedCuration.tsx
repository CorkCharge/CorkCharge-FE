// import type { SavedTip } from '@/shared/apis/bookmark/tipApi';
import Tip from '@/shared/components/Tip';
import type { Selected } from '@/shared/components/home/home.types';
import Curation from '@/shared/components/Curation';
import { useState } from 'react';
import type { TipData } from '@/shared/apis/tip/tipListApi';

interface CurationProps {
  tiplist?: TipData[];
}

//이것도 저장한 Tip 이어야할걸?
const SavedCuration = ({ tiplist = [] }: CurationProps) => {
  const [selected, setSelected] = useState<Selected>('ALL');
  const filtered =
    selected === 'ALL' ? tiplist : tiplist?.filter((t) => t.tipCategory === selected);
  return (
    <div className="w-full">
      <Tip selected={selected} setSelected={setSelected} className="mt-2" />
      <div className="h-[15px]"></div>
      <Curation tiplist={filtered} />
    </div>
  );
};

export default SavedCuration;
