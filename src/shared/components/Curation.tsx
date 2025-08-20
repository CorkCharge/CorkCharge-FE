// import React from 'react';
// import { useEffect, useState } from 'react';
import './tip.css';
import { type TipList } from '../apis/tip/tipListApi';
import TipPreview from './home/TipPreview';

// tipId: number; //3,
// title: string; //"내가 좋아하는 술, 마음껏 즐기려면? 콜키지 팁 대방출",
// tipCategory: string; //"CORKAGE",
// imageUrl: string;

interface CurationProps {
  tiplist?: TipList[];
}

//임시 데이터
const dummyTips: TipList[] = [
  {
    tipId: 1,
    title: '내가 좋아하는 술, 마음껏 즐기려면? 콜키지 팁 대방출',
    tipCategory: '콜키지 팁',
    imageUrl: 'https://placehold.co/176x172',
  },
  {
    tipId: 2,
    title: '삼겹살과 페어링하기 좋은 주류 추천',
    tipCategory: '페어링 큐레이션',
    imageUrl: 'https://placehold.co/176x234',
  },
  {
    tipId: 3,
    title: '임시 타이틀 3',
    tipCategory: 'EVENT',
    imageUrl: 'https://placehold.co/176x259',
  },
];

const Curation = ({ tiplist = [] }: CurationProps) => {
  //tiplist 반으로 나누기
  const mid = Math.ceil((tiplist?.length ?? 0) / 2);
  const leftList = tiplist.slice(0, mid);
  const rightList = tiplist.slice(mid);

  return (
    <div>
      <article className="flex gap-5">
        <div className="flex flex-col gap-2">
          {/* 왼쪽 list 나열 */}
          {tiplist.length > 0 && leftList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
          {/* 더미 데이터 */}
          {tiplist.length === 0 && dummyTips.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
        </div>
        <div className="flex flex-col gap-2">
          {/* 오른쪽 list 나열 */}
          {tiplist.length > 0 && rightList.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
          {/* 더미 데이터 */}
          {tiplist.length === 0 && dummyTips.map((tip) => <TipPreview key={tip.tipId} {...tip} />)}
        </div>
      </article>
    </div>
  );
};

export default Curation;
