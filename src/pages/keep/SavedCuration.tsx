// import { fetchSavedTip, type SavedTip } from '@/shared/apis/bookmark/tipApi';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import type { SavedTip } from '@/shared/apis/bookmark/tipApi';
import Tip from '@/shared/components/Tip';
import type { Selected } from '@/shared/components/home/type';
import TipPreview from '@/shared/components/home/TipPreview';

interface CurationProps {
  selected: Selected;
  setSelected: (v: Selected) => void;
  tiplist?: SavedTip[];
}

//이것도 저장한 Tip 이어야할걸?
const SavedCuration = ({ selected, setSelected, tiplist = [] }: CurationProps) => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   console.log('홈으로 이동');
  //   navigate('/home');
  // };
  //tiplist 반으로 나누기
  const mid = Math.ceil((tiplist?.length ?? 0) / 2);
  const leftList = tiplist.slice(0, mid);
  const rightList = tiplist.slice(mid);

  return (
    <div>
      <Tip selected={selected} setSelected={setSelected} />
      <div>fsef</div>
      <div className="w-[393px]">
        <article className="flex justify-between pl-4 pr-4">
          <div className="flex flex-col gap-2">
            {/* 왼쪽 list 나열 */}
            {tiplist.length > 0 && leftList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
          </div>
          <div className="flex flex-col gap-2">
            {/* 오른쪽 list 나열 */}
            {tiplist.length > 0 && rightList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
          </div>
        </article>
      </div>
    </div>
  );
};

export default SavedCuration;
