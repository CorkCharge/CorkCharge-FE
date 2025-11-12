// import React from 'react';
// import { useEffect, useState } from 'react';
import './tip.css';
import { type TipList } from '../apis/tip/tipListApi';
import TipPreview from './home/TipPreview';
import type { SavedTip } from '../apis/bookmark/tipApi';

interface CurationProps {
  tiplist?: TipList[] | SavedTip[];
}

const Curation = ({ tiplist = [] }: CurationProps) => {
  const renderTipReviews = () =>
    (tiplist.length ? tiplist : [...Array(9)]).map((_, idx) => (
      <TipPreview
        key={idx}
        tipId={idx}
        title={'코르크차지와 함께하는 내 주변 맛집 리스트'}
        imageUrl=""
        tipCategory="이벤트"
      />
    ));

  return (
    <div className="my-4 grid grid-cols-2 gap-3 px-4">
      {/* <div className="flex justify-between pl-4 pr-4">
        <div className="flex flex-col gap-2">
          {tiplist.length > 0 && leftList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
        </div>
        <div className="flex flex-col gap-2">
          {tiplist.length > 0 && rightList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
        </div>
      </div> */}
      {renderTipReviews()}
    </div>
  );
};

export default Curation;
