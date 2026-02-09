// import { useEffect, useState } from 'react';
import './tip.css';
import { type TipData } from '../apis/tip/tipListApi';
import TipPreview from './home/TipPreview';
// import type { SavedTip } from '../apis/bookmark/tipApi';
import { TIP_CATEGORY_MAP } from './home/home.types';

interface CurationProps {
  tiplist: TipData[];
}

const Curation = ({ tiplist }: CurationProps) => {
  const renderTipReviews = () =>
    tiplist.map((tip) => (
      <TipPreview
        key={tip.tipId}
        tipId={tip.tipId}
        title={tip.title}
        imageUrl={tip.imageUrl}
        tipCategory={TIP_CATEGORY_MAP[tip.tipCategory]}
      />
    ));

  return <div className="my-4 grid grid-cols-2 gap-3 px-4">{renderTipReviews()}</div>;
};

export default Curation;
