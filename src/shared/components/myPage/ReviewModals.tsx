import { useState, useRef } from 'react';

import Modal from '../common/Modal';
import { StarRate } from './StarRate';

import camera from '@/shared/components/myPage/images/camera.png';
import apiClient from '@/shared/apis/apiClient';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId?: number;
  restName?: string;
  createdAt?: string;
}

export const ShareModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="bg-[rgba(255,255,255,0.8)]">
      <h3 className="mb-2 text-center font-bold text-[var(--gray-8)]">후기를 공유하시겠습니까?</h3>
      <p className="mb-1 text-center text-sm font-medium text-[var(--gray-8)]">깍둑 건대점</p>
      <p className="text-center text-[10px] text-[var(--gray-6)]">2025.07.24 작성</p>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-white font-bold text-[var(--gray-7)]"
          onClick={onClose}
        >
          취소
        </button>
        <button className="h-[44px] flex-1 rounded-[10px] bg-[rgba(144,33,70,0.15)] font-bold text-[var(--primary)]">
          공유
        </button>
      </div>
    </Modal>
  );
};

export const ModifyModal = ({ isOpen, onClose, reviewId }: ModalProps) => {
  const [reviewInput, setReviewInput] = useState('');

  const rating = useRef(0);
  const fileSelector = useRef<HTMLInputElement>(null);

  const modifyReview = () => {
    if (!reviewInput) return;

    apiClient
      .patch(
        `/reviews/${reviewId}`,
        { userId: 1, content: reviewInput, rating },
        {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer' },
        }
      )
      .then(() => {})
      .catch((e) => console.log('리뷰 수정 실패 : ' + e));
  };

  const setRating = (r: number) => {
    rating.current = r;
    console.log(rating.current);
  };

  return (
    <Modal isOpen={isOpen} className="bg-[rgba(255,255,255,0.8)] text-center">
      <h3 className="mb-2 text-center text-2xl font-bold text-[var(--gray-8)]">리뷰 수정</h3>
      <StarRate rate={3} isEditable={true} className="mb-7 justify-center" starRating={setRating} />
      <div className="relative mb-5 h-[150px] rounded-ee-[30px] rounded-ss-[30px] bg-white">
        <textarea
          className="h-full w-full resize-none rounded-ee-[30px] rounded-ss-[30px] p-5 pr-10 pt-3 text-xs"
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
        />
        <span className="absolute right-2 top-2">&times;</span>
      </div>

      <button
        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--gray-1)] text-sm font-bold text-[var(--primary)]"
        onClick={() => fileSelector.current?.click()}
      >
        <img src={camera} className="h-[22px] w-[25px]" />
        사진 첨부하기
      </button>
      <input type="file" className="hidden" ref={fileSelector} accept="image/*" />
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--gray-1)] font-bold text-[var(--gray-7)]"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className={`h-[44px] flex-1 rounded-[10px] font-bold ${reviewInput ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-7)]'}`}
          onClick={modifyReview}
        >
          완료
        </button>
      </div>
    </Modal>
  );
};

export const DeleteModal = ({ isOpen, onClose, restName, createdAt, reviewId }: ModalProps) => {
  const deleteReview = () => {
    apiClient
      .delete(`/reviews/${reviewId}`)
      .then()
      .catch((e) => console.error('리뷰 삭제 실패 : ' + e));
  };
  return (
    <Modal isOpen={isOpen} className="bg-[rgba(255,255,255,0.8)]">
      <h3 className="mb-2 text-center font-bold text-[var(--gray-8)]">후기를 삭제하시겠습니까?</h3>
      <p className="mb-1 text-center text-sm font-medium text-[var(--gray-8)]">{restName}</p>
      <p className="text-center text-[10px] text-[var(--gray-6)]">{createdAt} 작성</p>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-white font-bold text-[var(--gray-7)]"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[rgba(144,33,70,0.15)] font-bold text-[var(--primary)]"
          onClick={deleteReview}
        >
          삭제
        </button>
      </div>
    </Modal>
  );
};
