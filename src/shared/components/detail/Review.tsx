import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { StarRate } from '../common/StarRate';
import Header from '../common/Header';
import apiClient from '@/shared/apis/apiClient';
import useRestaurantStore from '@/shared/store/useRestaurantStore';
import useMyReviewStore from '@/shared/store/useMyReviewStore';
import Modal from '../common/Modal';

import camera from '../../assets/detailPageImgs/camera.svg';

const Review = () => {
  const location = useLocation();
  const { rating, restId } = location.state || 1;

  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedfile, setSelectedFile] = useState<File>();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const fileSelector = useRef<HTMLInputElement>(null);

  const writingReviewInfo = useMyReviewStore((state) => state.writingReviewInfo);
  const restInfo = useRestaurantStore((state) => state.restInfo);

  const handleReview = () => {
    if (!content) return;
    const formData = new FormData();
    const payload = { content, rating };
    formData.append('request', JSON.stringify(payload));
    if (selectedfile) {
      formData.append('images', selectedfile);
    }

    apiClient
      .post(`/review/${restId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        navigate(`/detail-info/${restId}`, { state: { openReviewModal: true } });
      })
      .catch((e) => console.error(e));

    // api 통신 성공 시 호출
    setIsModalOpen(true);
  };

  const handelImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const reviewFinish = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <Header title="리뷰" type="back" backFn={() => navigate(-1)} className="w-full" />
      <div className="mb-12 mt-12 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center text-[30px] font-bold">
          <p>{`${restInfo.restaurantName}에서의`}</p>
          <p>콜키지는 어떠셨나요?</p>
        </div>
        <div className="flex gap-2">
          <StarRate rate={writingReviewInfo.get(restInfo.restaurantId) ?? 0} />
        </div>
      </div>
      <div className="flex h-[288px] w-full items-center justify-center rounded-br-[40px] rounded-tl-[40px] bg-white px-6 shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
        <textarea
          placeholder="리뷰를 입력해주세요"
          className="mb-12 ml-2 mr-4 mt-16 h-[270px] w-[340px] resize-none bg-transparent text-[17px] text-black outline-none placeholder:text-[var(--gray-5)]"
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <img src={previewUrl} className="w-[80%] max-w-[500px]" />
      </div>

      {!previewUrl && (
        <div
          className="mb-4 mt-4 flex h-[48px] w-[361px] cursor-pointer items-center justify-center rounded-[10px] border border-[#90212A] bg-white"
          onClick={() => fileSelector.current?.click()}
        >
          <div className="flex gap-2">
            <img src={camera} />
            <div className="text-[16px] font-bold text-[#90212A]">사진 첨부하기</div>
          </div>
        </div>
      )}

      <input
        type="file"
        className="hidden"
        ref={fileSelector}
        accept="image/*"
        onChange={handelImage}
      />

      <div
        onClick={handleReview}
        className={`mb-4 mt-12 flex h-[48px] w-[361px] items-center justify-center rounded-[10px] ${content ? 'cursor-pointer bg-[var(--primary)]' : 'cursor-not-allowed bg-white'} shadow-[0_2px_18px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex gap-2">
          <div className={`text-[16px] font-bold ${content ? 'text-white' : 'text-[#35353F]'}`}>
            리뷰 등록하기
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <span className="inline-block w-full text-center text-2xl font-bold">작성완료</span>
        <p className="mb-5 mt-1 text-center font-medium text-[var(--gray-8)]">
          소중한 리뷰 감사합니다
        </p>
        <button
          className="h-12 w-full rounded-xl bg-[var(--primary)] font-semibold text-white"
          onClick={reviewFinish}
        >
          확인
        </button>
      </Modal>
    </div>
  );
};

export default Review;
