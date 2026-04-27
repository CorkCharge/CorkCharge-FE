import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TipArticle from '@/shared/components/TipArticle';
import { fetchTipInfo, type TipInfo } from '@/shared/apis/tip/tipListApi';
import Modal from '@/shared/components/common/Modal';
import { deleteTip, save } from '@/shared/apis/bookmark/tipApi';
import useBookmarkStore from '@/shared/store/useBookmarkStore';

import whiteArrow from '../../shared/assets/whiteArrow.svg';
import bookmarked from '@/shared/components/home/assets/bookmarked.svg';
import keep from '@/shared/assets/keep.svg';

// tipArticle/:id 페이지
const Tip = () => {
  const navigate = useNavigate();

  const [tip, setTip] = useState<TipInfo>();
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState<boolean>(false);
  //tip 저장
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const tipId = Number(id);

  const selectedTips = useBookmarkStore((state) => state.selectedTips);
  const toggleTip = useBookmarkStore((state) => state.toggleTip);

  useEffect(() => {
    if (!id) {
      console.error('잘못된 tip id');
      return;
    }

    getTipInfo();
  }, [tipId, id]);

  useEffect(() => {
    setIsBookmarked(selectedTips.includes(tipId));
  }, [selectedTips, tipId]);

  const onBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending || !tip) return;
    setPending(true);
    try {
      if (!isBookmarked) {
        await save(tip.tipId, 'TIP');
        setIsBookmarked(true);
        setIsOpen(true);
      } else {
        await deleteTip(tip.tipId, 'TIP');
        setIsBookmarked(false);
      }
      toggleTip(tip.tipId);
    } catch (err) {
      console.log('북마크 토글 실패: ', err);
    } finally {
      setPending(false);
    }
  };

  const getTipInfo = async () => {
    try {
      const res = await fetchTipInfo(tipId);
      setTip(res);
    } catch {
      console.error('tip 가져오기 실패');
    }
  };

  const handleClick = () => {
    navigate('/home');
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
            <img src={whiteArrow} onClick={handleClick} className="h-5 w-3 cursor-pointer" />
            <div className="font-bold text-white">corkcharge TIP</div>
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
