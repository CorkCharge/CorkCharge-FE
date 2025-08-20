// import React from 'react';
// import { useEffect, useState } from 'react';
import './tip.css';
import { type TipList } from '../apis/tip/tipListApi';
import TipPreview from './home/TipPreview';

interface CurationProps {
  tiplist?: TipList[];
}

const Curation = ({ tiplist = [] }: CurationProps) => {
  //tiplist 반으로 나누기
  const mid = Math.ceil((tiplist?.length ?? 0) / 2);
  const leftList = tiplist.slice(0, mid);
  const rightList = tiplist.slice(mid);

  return (
    <div className="w-[393px]">
      <article className="flex justify-between pl-4 pr-4">
        <div className="flex flex-col gap-2">
          {/* 왼쪽 list 나열 */}
          {tiplist.length > 0 && leftList.map((tip) => <TipPreview {...tip} />)}
        </div>
        <div className="flex flex-col gap-2">
          {/* 오른쪽 list 나열 */}
          {tiplist.length > 0 && rightList.map((tip) => <TipPreview {...tip} />)}
        </div>
      </article>
    </div>
  );
};

export default Curation;
