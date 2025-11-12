import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TipArticle from '@/shared/components/TipArticle';
import { fetchTipInfo, type TipInfo } from '@/shared/apis/tip/tipListApi';
import { bookmarkRequest, deleteRequest } from '@/shared/apis/bookmark/bookmarkApi';

import whiteArrow from '../../shared/assets/TipImgs/whiteArrow.svg';
import bookmarked from '@/shared/components/home/assets/bookmarked.svg';
import keep from '@/shared/assets/keep.svg';

// tipArticle/:id 페이지
const Tip = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('홈으로 이동');
    navigate('/home');
  };

  const [tip, setTip] = useState<TipInfo>();
  const { id } = useParams<{ id: string }>();
  const tipId = Number(id);

  useEffect(() => {
    if (!id) {
      console.log('id: ' + id); //현재 undefined
      console.error('잘못된 tip id');
      return;
    }
    (async () => {
      try {
        const res = await fetchTipInfo(tipId);
        setTip(res);
      } catch {
        console.error('API  호출 실패, 더미 데이터 호출');
      }
    })();
    return () => {};
  }, [tipId, id]);

  //tip 저장
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const keepStore = async () => {
    try {
      const res = await bookmarkRequest({
        targetId: tipId ?? 0,
        targetType: 'TIP',
      });
      console.log('tip 저장성공: ', res);
    } catch (err) {
      console.log('tip 저장실패: ', err);
    }
  };

  //tip 저장취소
  const deleteStore = async () => {
    try {
      const res = await deleteRequest({
        targetId: tipId ?? 0,
        targetType: 'TIP',
      });
      console.log('tip 저장 삭제성공: ', res);
    } catch (err) {
      console.log('tip 저장 삭제실패: ', err);
    }
  };

  const [pending, setPending] = useState<boolean>(false);
  const onBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending) return;
    setPending(true);
    try {
      if (isBookmarked) {
        await deleteStore();
        setIsBookmarked(false);
      } else {
        await keepStore(); //원래 이건데 왜 저장삭제 실패?
        // await deleteStore();
        setIsBookmarked(true);
      }
    } catch (err) {
      console.log('북마크 토글 실패:', err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full">
        {/* <TipArticle
          tipId={tip?.tipId ?? 1}
          title={tip?.title ?? ''}
          content={tip?.content ?? ''}
          tipCategory={tip?.tipCategory ?? ''}
          imageUrls={tip?.imageUrls ?? []}
          createdAt={tip?.createdAt ?? ''}
        /> */}
        <TipArticle
          tipId={1}
          title="삼겹살과 페어링하기 좋은 주류 추천"
          tipCategory="페어링 큐레이션"
          content="기름지고 고소한 삼겹살, 그냥 먹어도 맛있지만 잘 어울리는 술과 함께라면 그 맛은 두 배가 되죠. “소주만 먹기엔 뭔가 아쉽다…” 하셨던 분들께, 오늘은 삼겹살과 찰떡같이 어울리는 주류 조합을 소개해드립니다. 고기 한 점에 술 한 잔, 그 조화가 완벽해지는 순간을 위해 고른 추천 리스트"
          imageUrls={[]}
          createdAt=""
        />
        <div className="absolute top-0 w-full">
          <div className="flex h-[48px] w-full items-center justify-between pl-4 pr-4">
            <img
              src={whiteArrow}
              onClick={handleClick}
              className="h-[20px] w-[12px] cursor-pointer"
            />
            <div className="text-[16px] font-bold text-[#FFFFFF]">corkcharge TIP</div>
            <img
              src={isBookmarked ? bookmarked : keep}
              onClick={onBookmarkClick}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Tip;
