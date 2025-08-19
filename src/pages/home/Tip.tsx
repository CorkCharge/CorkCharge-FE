// import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import whiteArrow from '../../shared/assets/TipImgs/whiteArrow.svg';
import TipArticle from '@/shared/components/TipArticle';
import keep from '@/shared/assets/keep.svg';
import { useEffect, useState } from 'react';
import { fetchTipInfo, type TipInfo } from '@/shared/apis/tip/tipListApi';
// import type { TipInfo } from '@/shared/apis/tip/tipListApi';

const Tip = () =>
  // { tipId, title, content, tipCategory, imageUrls, createdAt }: TipInfo
  {
    const navigate = useNavigate();
    const handleClick = () => {
      console.log('홈으로 이동');
      navigate('/home');
    };

    // const [tip, setTip] = useState<TipInfo>();
    const { id } = useParams<{ id: string }>();
    const tipId = Number(id);

    useEffect(() => {
      if (!id) {
        console.log('id: ' + id); //현재 undefined
        console.error('잘못된 tip id');
        return;
      }

      let cancelled = false;
      // const fetchData = async () => {
      (async () => {
        try {
          const res = await fetchTipInfo(tipId);
          console.log(res);
          setTip(res);
        } catch (err) {
          console.error('API  호출 실패, 더미 데이터 호출');
        }
        // };
      })();
      return () => {
        cancelled = true;
      };
      // fetchData();
    }, [tipId, id]);

    //더미 데이터
    const dummyTip: TipInfo = {
      tipId: 1,
      title: '삼겹살과 페어링하기 좋은 주류 츄천',
      content: `"그 맛은 두 배가 되죠.
            소주만 먹기엔 뭔가 아쉽다…”

            하셨던 분들께, 오늘은 삼겹살과 찰떡같이 어울리는 주류 조합을 소개해드립니다.
            
            고기 한 점에 술 한 잔,
            
            그 조화가 완벽해지는 순간을 위해 고른 추천 리스트"`,
      tipCategory: '페어링 큐레이션',
      imageUrls: ['https://placehold.co/393x358'],
      createdAt: new Date().toISOString(),
    };
    const [tip, setTip] = useState<TipInfo>(dummyTip);

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <TipArticle
            tipId={tip.tipId}
            category={tip.tipCategory}
            mainTitle={tip.title}
            // subTitle={tip.}
            info={tip.content}
            imageUrls={tip.imageUrls}
            createdAt={tip.createdAt}
            //       category="페어링 큐레이션"
            //       mainTitle="삼겹살과 페어링하기 좋은 주류 츄천"
            //       // subTitle="🥓삼겹살과 주류의\nPERFECT 조합"
            //       subTitle={`🥓삼겹살과 주류의
            //     PERFECT 조합`}
            //       info={`그 맛은 두 배가 되죠.
            //     “소주만 먹기엔 뭔가 아쉽다…”

            //     하셨던 분들께, 오늘은 삼겹살과 찰떡같이 어울리는 주류 조합을 소개해드립니다.

            // 고기 한 점에 술 한 잔,
            // 그 조화가 완벽해지는 순간을 위해 고른 추천 리스트`}
          />
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
    );
  };

export default Tip;
