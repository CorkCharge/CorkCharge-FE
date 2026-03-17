import { useState } from 'react';

import { useGetMyKeepReviews } from '@/shared/queries/bookmark/useGetMyKeepReviews';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import ReviewDetail from '@/shared/components/home/ReviewDetail';
import useMyPageStore from '@/shared/store/useMyPageStore';

import logo from '@/shared/assets/images/logo.svg';
import check from '@/shared/components/detail/assets/check.svg';

const Review = () => {
  // const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [modalStoreName, setModalStoreName] = useState(''); //공유하기 모달 내 store 이름
  const [modalStoreId, setModalStoreId] = useState<number>(); //공유하기 모달 내 store id
  const [modalReviewId, setModalReviewId] = useState<number>(); //공유하기 모달 내 review id
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기

  const myProfile = useMyPageStore((state) => state.myProfile);

  const { data: reviews } = useGetMyKeepReviews();

  const renderReviews = () => {
    if (!reviews) return;

    if (reviews?.length < 1) {
      return <p className="flex h-[30vh] items-center justify-center">저장된 리뷰가 없습니다.</p>;
    }

    return reviews?.map((review) => (
      <ReviewDetail
        id={review.reviewId}
        isLiked={review.scrap}
        restaurantId={1}
        restaurantName={review.restaurantName}
        rating={review.rating}
        imageUrls={review.reviewImageUrl.length > 0 ? [review.reviewImageUrl] : []}
        writer={myProfile.nickname}
        content={review.content}
        createdAt={review.createdAt}
        bookmarkCount={review.bookmarkCount}
        setIsShareModalOpen={(isOpen) => setIsShareModalOpen(isOpen)}
        setModalStoreName={(name) => setModalStoreName(name)}
        setModalStoreId={(id) => setModalStoreId(id)}
        setModalReviewId={(id) => setModalReviewId(id)}
      />
    ));
  };

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    if (!modalStoreId || !modalReviewId) return;

    navigator.clipboard.writeText(
      window.location.origin + `/detail-info/${modalStoreId}#${modalReviewId}`
    );
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {renderReviews()}

      {/* 공유하기 모달 */}
      <Modal
        isOpen={isShareModalOpen}
        hasCloseButton={true}
        onClose={() => setIsShareModalOpen(false)}
      >
        <div className="mb-4 flex items-center">
          <img src={logo} className="h-[22px] w-[13px]" />
          <div className="ml-3 flex flex-col">
            <span className="font-semibold">{modalStoreName}</span>
            <span className="text-xs text-[rgba(60,60,67,0.6)]">corkcharge.com</span>
          </div>
        </div>
        <Button
          value="링크 복사하기"
          className="bg-[var(--gray-1)] text-[var(--gray-8)] shadow-none"
          onClick={clipLink}
        />
      </Modal>

      {/* 복사완료 모달 */}
      {isCopiedModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
          <div className="absolute top-12 flex h-12 w-[125px] items-center justify-center rounded-xl bg-white p-6 font-semibold text-[var(--primary)] shadow-lg">
            <img src={check} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
