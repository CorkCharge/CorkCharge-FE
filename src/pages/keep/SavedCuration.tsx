import whiteArrow from '../../shared/assets/TipImgs/whiteArrow.svg';
import TipArticle from '@/shared/components/TipArticle';
import keep from '@/shared/assets/keep.svg';
// import { fetchSavedTip, type SavedTip } from '@/shared/apis/bookmark/tipApi';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SavedTip } from '@/shared/apis/bookmark/tipApi';
import Tip from '@/shared/components/Tip';
import type { Selected } from '@/shared/components/home/type';

interface CurationProps {
  selected: Selected;
  setSelected: (v: Selected) => void;
  tiplist?: SavedTip[];
}

//이것도 저장한 Tip 이어야할걸?
const SavedCuration = ({ selected, setSelected, tiplist = [] }: CurationProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('홈으로 이동');
    navigate('/home');
  };
  return (
    <div>
      <Tip selected={selected} setSelected={setSelected} />

      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          {/* <TipArticle
            tipId={1}
            title="삼겹살과 페어링하기 좋은 주류 츄천" //'와인 테스트';
            content="fdssv" //'참석 전 물병, 스파이월러, 노트와 펜을 챙기면 편해요. 드레스 코드는 ‘스마트 캐주얼’인 경우가 많으니 미리 확인하시고, 일찍 도착해 무료 스낵도 즐겨보세요.';
            tipCategory="페어링 큐레이션" //'EVENT';
            imageUrls={['fsef', 'fef']}
            createdAt="2025-08-07T21:40:31.530027"
          /> */}
          <div className="absolute top-0">
            <div className="flex h-[48px] w-[393px] items-center justify-between pl-4 pr-4">
              <img
                src={whiteArrow}
                onClick={handleClick}
                className="h-[20px] w-[12px] cursor-pointer"
              />
              <div className="text-[16px] font-bold text-[#FFFFFF]">corkcharge TIP</div>
              <img src={keep} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCuration;
