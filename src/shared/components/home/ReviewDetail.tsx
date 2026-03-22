import { useNavigate } from 'react-router-dom';

import { StarWithStroke } from '../common/StarRate';
import { useToggleReviewLike } from '@/shared/queries/review/useToggleReview';

import share from '@/shared/assets/detailPageImgs/share.svg';

interface ReviewDetailProps {
  id: number;
  isLiked: boolean;
  restaurantId: number;
  restaurantName: string;
  rating: number;
  imageUrls: string[];
  writer: string;
  content: string;
  createdAt: string;
  bookmarkCount: number;

  setIsShareModalOpen?: (_: boolean) => void;
  setModalStoreName?: (_: string) => void;
  setModalStoreId?: (_: number) => void;
  setModalReviewId?: (_: number) => void;
}

function ReviewDetail({
  id,
  isLiked,
  restaurantId,
  restaurantName,
  rating,
  imageUrls,
  writer,
  content,
  createdAt,
  bookmarkCount,
  setIsShareModalOpen,
  setModalStoreId,
  setModalStoreName,
  setModalReviewId,
}: ReviewDetailProps) {
  const navigate = useNavigate();

  const { mutate: toggleBookmark } = useToggleReviewLike();

  const renderReviewImages = (imgUrls: string[]) =>
    imgUrls.map((url, idx) => (
      <img className="aspect-square w-[40%] shrink-0 rounded-lg" key={idx} src={url} />
    ));

  const handleKeep = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    toggleBookmark({ id, isLiked });
  };

  const handleShare = async (
    e: React.MouseEvent<HTMLDivElement>,
    storeName: string,
    storeId: number
  ) => {
    e.stopPropagation();

    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: restaurantName,
          text: `${restaurantName} 리뷰를 확인해보세요!`,
          url: window.location.origin + `/detail-info/${restaurantId}#${id}`,
        });
      } catch (err) {
        console.error('공유 중 에러 발생 : ' + err);
      }
    } else {
      setModalStoreId?.(storeId);
      setModalStoreName?.(storeName);
      setIsShareModalOpen?.(true);
      setModalReviewId?.(id);
    }
  };

  return (
    <div
      className="relative w-full cursor-pointer rounded-2xl bg-[var(--gray-1)] p-4"
      key={id}
      onClick={() => navigate(`/detail-info/${restaurantId}`)}
    >
      {/* 매장명 + 별점 */}
      <span className="text-xl font-bold text-[var(--gray-8)]">{restaurantName}</span>
      <div className="my-2 flex gap-1">
        <StarWithStroke rate={rating} />
        <span className="font-medium">{rating}</span>
      </div>

      {/* 리뷰 이미지 */}
      <div className="mb-1 flex gap-2 overflow-y-auto">{renderReviewImages(imageUrls)}</div>

      {/* 리뷰 작성 정보 */}
      <p className="mb-2 font-medium">{content}</p>
      <div className="flex gap-2 text-[10px] font-medium">
        <span>{writer}</span>
        <span>{createdAt.split('T')[0].replaceAll('-', '.')}</span>
      </div>

      {/* 좋아요 + 공유 */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1">
        <div
          className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white"
          onClick={(e) => handleKeep(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle
              cx="16"
              cy="16"
              r="15"
              fill={isLiked ? 'var(--primary)' : 'none'}
              stroke={isLiked ? 'none' : 'var(--gray-3)'}
            />
            <path
              d="M10.7239 23.6525C10.4143 23.6525 10.1728 23.5764 9.99935 23.4242C9.82596 23.272 9.73926 23.058 9.73926 22.7821V10.3959C9.73926 9.71567 9.9591 9.20434 10.3988 8.86186C10.8385 8.51939 11.4949 8.34814 12.3681 8.34814H19.6322C20.5054 8.34814 21.1618 8.51939 21.6015 8.86186C22.0412 9.20434 22.261 9.71567 22.261 10.3959V22.7821C22.261 23.058 22.1744 23.272 22.0009 23.4242C21.8276 23.5764 21.586 23.6525 21.2763 23.6525C21.0473 23.6525 20.8336 23.5931 20.6355 23.4742C20.4435 23.3553 20.1369 23.1412 19.7158 22.832L16.0837 20.0851C16.028 20.0375 15.9723 20.0375 15.9165 20.0851L12.2845 22.832C11.8634 23.1459 11.5537 23.36 11.3556 23.4742C11.1574 23.5931 10.9468 23.6525 10.7239 23.6525Z"
              fill="white"
              stroke={isLiked ? 'none' : 'var(--gray-7)'}
              strokeWidth={1.5}
            />
          </svg>
        </div>
        <span className="text-[10px] font-medium text-[var(--gray-8)]">
          {(bookmarkCount ?? 0) > 99 ? '99+' : (bookmarkCount ?? 0)}
        </span>
        <div
          className="relative flex size-6 cursor-pointer rounded-full bg-white"
          onClick={(e) => handleShare(e, restaurantName, id)}
        >
          <img
            src={share}
            className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[40%]"
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
