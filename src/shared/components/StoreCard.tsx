// import React from 'react';
import bookmark from '@/shared/components/home/assets/keep.svg';
import share from '@/shared/components/home/assets/share.svg';
import star from '../assets/star.svg';
import keepIcon from '../assets/keep.svg';
import bookmarked from '@/shared/components/keep/assets/bookmarked.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookmarkRequest, deleteRequest } from '../apis/bookmark/bookmarkApi';
import { useEffect, useRef, useState } from 'react';
import Share from './detail/Share';

interface storeProps {
  key?: number;
  restaurantId?: number;
  imageUrl?: string;
  keep: number;
  price: string;
  name: string;
  local: string;
  rating: number;
  review?: number;
  onUnbookmarked?: () => void;
}

const StoreCard = ({
  key,
  restaurantId,
  imageUrl,
  keep,
  price,
  name,
  local,
  rating,
  review,
  onUnbookmarked,
}: storeProps) => {
  const navigate = useNavigate();
  const goStore = () => {
    console.log('restaurantId: ' + key);
    console.log('가게 상세 정보 페이지 이동');
    navigate(`/detailInfo/${restaurantId}`);
  };

  const { pathname } = useLocation();
  const [isBookmarked, setIsBookmarked] = useState<boolean>();
  // const [isBookmarked, setIsBookmarked] = useState<boolean>(() => pathname.startsWith('/keep'));
  const [keepCount, setKeepCount] = useState<number>(keep);

  //가게 저장 취소 시 리렌더링
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setKeepCount((prev) => prev + (isBookmarked ? 1 : -1));
  }, [isBookmarked]);

  // 라우트가 바뀌면 북마크 초기 상태를 경로에 맞춰 동기화
  useEffect(() => {
    setIsBookmarked(pathname.startsWith('/keep'));
  }, [pathname]);

  //가게 저장하기
  const keepStore = async () => {
    try {
      const res = await bookmarkRequest({
        targetId: restaurantId ?? 0,
        targetType: 'RESTAURANT',
      });
      console.log('저장성공: ', res);
    } catch (err) {
      console.log('저장실패: ', err);
    }
  };

  //가게 저장취소
  const deleteStore = async () => {
    try {
      const res = await deleteRequest({
        targetId: restaurantId ?? 0,
        targetType: 'RESTAURANT',
      });
      console.log('가게 저장 삭제성공: ', res);
    } catch (err) {
      console.log('가게 저장 삭제실패: ', err);
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
        onUnbookmarked?.(); //성공시 Keep.tsx 로 보냄
        // console.log('가게 저장 삭제성공');
      } else {
        await keepStore();
        setIsBookmarked(true);
        // console.log('저장성공');
      }
    } catch (err) {
      console.log('북마크 토글 실패:', err);
    } finally {
      setPending(false);
    }
  };

  //공유하기 기능
  //링크 공유하기 기능
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const handleShare = () => {
    console.log('공유하기 창 띄우기');
    setOpenShareModal(true);
  };

  const baseURL = window.location.origin;
  const pathURL = `${baseURL}/detailInfo/${restaurantId}`;
  const handleCopyLink = () => {
    try {
      console.log(pathURL);
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
    }
  };

  return (
    <div className="mb-4 cursor-pointer rounded-t-lg border border-x-0 border-t-0 border-b-slate-300 pb-2">
      <div onClick={goStore} className="mb-[10px] h-[220px] w-[361px]">
        <div className="relative">
          {/* <img src="https://placehold.co/361x170" className="rounded-t-lg" />  */}
          <img
            src={imageUrl || 'https://placehold.co/361x170'}
            className="h-[170px] w-[361px] overflow-hidden rounded-t-xl"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== 'https://placehold.co/361x170') {
                img.onerror = null;
                img.src = 'https://placehold.co/361x170';
              }
            }}
          />
          <div className="absolute bottom-2 left-4">
            <div className="flex gap-2">
              <img src={keepIcon} />
              <span className="text-[18px] font-bold text-white">{keepCount}</span>
            </div>
          </div>
        </div>
        <div className="flex h-[50px] items-center justify-center rounded-b-lg bg-gradient-to-r from-[#90212A]/65 to-[#DCDBE8] text-[18px] font-bold text-white">
          {price}
        </div>
      </div>
      <div className="flex flex-col gap-6 pl-2 pr-2">
        <div onClick={goStore}>
          <div className="mb-[2px] text-[20px] font-bold">{name}</div>
          <div>
            <div>{local}</div>
            {/* <div>{time}</div> */}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src={star} />
            <span>{rating}</span>
            <span> 리뷰 total {review}</span>
          </div>
          <div className="flex gap-4 text-[10px] text-[#C5C8CF]">
            <div
              // onClick={(e) => {
              //   e.stopPropagation();
              //   // keepStore();
              //   // setIsBookmarked(!isBookmarked);
              // }}
              onClick={onBookmarkClick}
            >
              <img src={isBookmarked ? bookmarked : bookmark} className="h-[22px] w-[16px]" />
              <div className={`flex-col ${isBookmarked ? 'text-[#90212A]' : 'text-[#C5C8CF]'}`}>
                저장
              </div>
            </div>
            <div>
              <img
                src={share}
                // onClick={handleShare}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
              />
              <div>공유</div>
            </div>
          </div>
        </div>
      </div>
      {openShareModal && (
        <Share
          copylink={pathURL}
          restaurantName={name}
          handleOpt1Click={() => handleCopyLink()}
          handleOpt2Click={() => setOpenShareModal(false)}
        />
      )}
    </div>
  );
};

export default StoreCard;
