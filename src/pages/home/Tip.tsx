import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TipArticle from '@/shared/components/TipArticle';
import { fetchTipInfo, type TipInfo } from '@/shared/apis/tip/tipListApi';
// import { bookmarkRequest, deleteRequest } from '@/shared/apis/bookmark/bookmarkApi';
import Modal from '@/shared/components/common/Modal';

import whiteArrow from '../../shared/assets/TipImgs/whiteArrow.svg';
import bookmarked from '@/shared/components/home/assets/bookmarked.svg';
import keep from '@/shared/assets/keep.svg';
import { deleteTip, save } from '@/shared/apis/bookmark/tipApi';

// tipArticle/:id 페이지
const Tip = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };

  const [tip, setTip] = useState<TipInfo>();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const tipId = Number(id);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 tip id');
      return;
    }
    (async () => {
      try {
        const res = await fetchTipInfo(tipId);
        setTip(res);
      } catch {
        console.error('tip 가져오기 실패');
      }
    })();
    return () => {};
  }, [tipId, id]);

  //tip 저장
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const [pending, setPending] = useState<boolean>(false);
  const onBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending || !tip) return;
    setPending(true);
    try {
      if (!isBookmarked) {
        const res = await save(tip.tipId, 'TIP');
        console.log(res);
        setIsBookmarked(false);
      } else {
        await deleteTip(tip.tipId, 'TIP');
        setIsBookmarked(true);
        setIsOpen(true);
      }
    } catch (err) {
      console.log('북마크 토글 실패: ', err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full">
        {tip && (
          <TipArticle
            tipId={tip.tipId}
            title={tip.title}
            content={tip.content}
            tipCategory={tip.tipCategory}
            imageUrls={tip.imageUrls}
            createdAt={tip.createdAt}
          />
        )}
        <div className="absolute top-0 w-full">
          <div className="flex h-[48px] w-full items-center justify-between pl-4 pr-4">
            <img
              src={whiteArrow}
              onClick={handleClick}
              className="h-[20px] w-[12px] cursor-pointer"
            />
            <div className="text-[16px] font-bold text-[#FFFFFF]">corkcharge TIP</div>
            <img
              src={isBookmarked ? keep : bookmarked}
              onClick={onBookmarkClick}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <span className="block w-full text-center text-2xl font-bold text-[var(--gray-8)]">
          저장완료
        </span>
        <p className="mb-6 mt-3 text-center">팁을 저장했습니다.</p>
        <button
          className="h-[48px] w-full rounded-xl bg-[var(--primary)] font-semibold text-white"
          onClick={() => setIsOpen(false)}
        >
          확인
        </button>
      </Modal>
    </div>
  );
};

export default Tip;
