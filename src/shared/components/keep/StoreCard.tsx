import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { bookmarkRequest, deleteRequest } from '../../apis/bookmark/bookmarkApi';
// import Share from '../detail/Share';
import Share from '@/shared/icons/Share';

import bookmark from '@/shared/components/home/assets/keep.svg';
import share from '@/shared/components/home/assets/share.svg';
import star from '@/shared/assets/star.svg';
import keepIcon from '@/shared/assets/keep.svg';
import bookmarked from '@/shared/components/keep/assets/bookmarked.svg';
import Star from '../../assets/star.svg';
import Bookmark from '@/shared/icons/Bookmark';
import { GROUP_ICONS } from '@/shared/constants/groupMarker';

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

// const StoreCard = ({
//   key,
//   restaurantId,
//   imageUrl,
//   keep,
//   price,
//   name,
//   local,
//   rating,
//   review,
//   onUnbookmarked,
// }: storeProps) => {
const StoreCard = ({
  restaurant,
  groupMarker,
}: {
  restaurant: {
    restaurantId: number;
    name: string;
    rating: number;
    reviewCount: number;
    openingHoursText: string;
    imageUrls: string[];
    corkagePrice: string;
    corkageOption: string;
  };
  groupMarker: string;
}) => {
  const navigate = useNavigate();
  const goStore = () => {
    navigate(`/detail-info/${restaurant.restaurantId}`);
  };

  const { pathname } = useLocation();
  const [isBookmarked, setIsBookmarked] = useState<boolean>();
  // const [isBookmarked, setIsBookmarked] = useState<boolean>(() => pathname.startsWith('/keep'));
  // const [keepCount, setKeepCount] = useState<number>(keep);

  //가게 저장 취소 시 리렌더링
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // setKeepCount((prev) => prev + (isBookmarked ? 1 : -1));
  }, [isBookmarked]);

  // 라우트가 바뀌면 북마크 초기 상태를 경로에 맞춰 동기화
  useEffect(() => {
    setIsBookmarked(pathname.startsWith('/keep'));
  }, [pathname]);

  //가게 저장하기
  const keepStore = async () => {
    try {
      const res = await bookmarkRequest({
        targetId: restaurant.restaurantId ?? 0,
        targetType: 'RESTAURANT',
      });
    } catch (err) {
      console.error('저장실패: ', err);
    }
  };

  //가게 저장취소
  const deleteStore = async () => {
    try {
      const res = await deleteRequest({
        targetId: restaurant.restaurantId ?? 0,
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
        //onUnbookmarked?.(); //성공시 Keep.tsx 로 보냄
      } else {
        await keepStore();
        setIsBookmarked(true);
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
  const pathURL = `${baseURL}/detail-info/${restaurant.restaurantId}`;
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
    }
  };

  return (
    <div
      className="flex w-full flex-col bg-white"
      onClick={() => navigate(`/detail-info/${restaurant.restaurantId}`)}
    >
      <div className="relative flex w-full items-start justify-between pl-4">
        {/* 식당 이름 */}
        <h2 className="text-xl font-bold leading-none text-[var(--gray-8)]">{restaurant.name}</h2>
        {/* 우측 아이콘 버튼들 */}
        <div className="flex gap-1">
          <img src={GROUP_ICONS[groupMarker]} className="size-6 cursor-pointer" />
          <Share className="cursor-pointer" />
        </div>
      </div>

      {/* 평점 및 영업 정보 */}
      <div className="mt-1 flex items-center pl-4">
        <img src={Star} alt="star" className="h-[15px] w-[16px]" />

        {/* 평점 */}
        <span className="ml-[4px] font-[500] text-[var(--text-8)]">
          {restaurant.rating?.toFixed(1) ?? 0}
        </span>

        {/* 리뷰 수 */}
        <span className="ml-1 text-sm font-[500] text-[var(--gray-5)]">
          ({restaurant.reviewCount})
        </span>

        <div className="ml-2 flex items-center gap-1">
          {/* 영업 상태 */}
          <span className="text-[14px] font-[600] text-[var(--gray-8)]">영업중</span>
          {/* 영업 시간 */}
          <span className="max-w-[120px] truncate text-sm font-[500] text-[var(--gray-5)]">
            {restaurant.openingHoursText}
          </span>
        </div>
      </div>

      {/* 음식 이미지 리스트 */}
      <div className="mt-2 flex w-full gap-1 overflow-hidden pl-4">
        {restaurant.imageUrls &&
          restaurant.imageUrls.length > 0 &&
          restaurant.imageUrls
            .slice(0, 4)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${name}-food-${index}`}
                className="h-[80px] w-[80px] rounded-[4px] object-cover"
              />
            ))}
      </div>

      {/* 하단 정보 박스 (비용/기타) */}
      <div className="mt-2 flex w-full flex-col justify-center rounded-2xl bg-[var(--gray-1)] px-4 py-2">
        {/* 비용 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit font-[700]">비용</span>
          <span className="ml-9 truncate font-[500]">{restaurant.corkagePrice}</span>
        </div>

        {/* 구분선 */}
        <div className="my-2 h-[1px] w-full bg-[var(--gray-3)]" />

        {/* 기타 */}
        <div className="flex w-full items-center">
          <span className="min-w-fit font-[700]">기타</span>
          <span className="ml-9 text-nowrap font-[500]">{restaurant.corkageOption ?? '없음'}</span>
        </div>
      </div>

      {/* 공유하기 모달 */}
      {/* <div onClick={(e) => e.stopPropagation()}>
        <Modal
          isOpen={isShareModalOpen}
          hasCloseButton={true}
          onClose={() => setIsShareModalOpen(false)}
        >
          <div className="mb-4 flex items-center">
            <img src={logo} className="h-[22px] w-[13px]" />
            <div className="ml-3 flex flex-col">
              <span className="font-semibold">{name}</span>
              <span className="text-xs text-[rgba(60,60,67,0.6)]">corkcharge.com</span>
            </div>
          </div>
          <Button
            value="링크 복사하기"
            className="bg-[var(--gray-1)] text-[var(--gray-8)] shadow-none"
            onClick={clipLink}
          />
        </Modal>
      </div> */}

      {/* 복사완료 모달 */}
      {/* {isCopiedModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
          <div className="absolute top-12 flex h-12 w-[125px] items-center justify-center rounded-xl bg-white p-6 font-semibold text-[var(--primary)] shadow-lg">
            <img src={check} />
          </div>
        </div>
      )} */}

      {/* <div onClick={(e) => e.stopPropagation()}>
        <GroupSelector
          isOpen={isGroupSelectorOpen}
          topSnapVh={17.8}
          onClose={handleCloseGroupSelector}
        >
          {isGroupSelectorOpen && (
            <GroupList
              key={`group-list-${resId}-${isGroupSelectorOpen}`}
              onClose={handleCloseGroupSelector}
              restaurantName={name}
              restaurantId={resId}
            />
          )}
        </GroupSelector>
      </div> */}
    </div>
  );
};

export default StoreCard;
