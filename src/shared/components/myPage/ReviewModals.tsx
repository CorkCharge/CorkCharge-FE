import { useState, useRef } from 'react';

import Modal from '../common/Modal';
import { StarRate } from '../common/StarRate';

import camera from '@/shared/components/myPage/images/gray-camera.svg';
import plus from '@/shared/components/myPage/images/plus.svg';
import Button from '../common/Button';
import { useDeleteMyReview, useUpdateMyReview } from '@/shared/queries/user/useMyReviewList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  restId?: number;
  reviewId?: number;
  restName?: string;
  createdAt?: string;
  writer?: string;
}

interface ShareProps extends ModalProps {
  onCopy: () => void;
}

interface ModifyProps extends ModalProps {
  setModifyCompleteOpen: (_: boolean) => void;
}

interface DeleteProps extends ModalProps {
  setDeleteCompleteOpen: (_: boolean) => void;
}

export const ShareModal = ({ isOpen, onClose, restName, writer, onCopy }: ShareProps) => {
  return (
    <Modal isOpen={isOpen} className="bg-white">
      <h3 className="mb-2 text-center text-xl font-bold text-[var(--gray-8)]">
        리뷰를 공유하시겠습니까?
      </h3>
      <span className="inline-block w-full text-center text-sm font-medium text-[var(--gray-8)]">
        {restName}
      </span>
      <span className="mb-1 block w-full text-center text-[10px] font-medium text-[var(--gray-6)]">
        {writer} 작성
      </span>

      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--gray-1)] font-bold text-[var(--gray-8)]"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--primary)] font-bold text-white"
          onClick={onCopy}
        >
          공유
        </button>
      </div>
    </Modal>
  );
};

export const ModifyModal = ({ isOpen, onClose, reviewId, setModifyCompleteOpen }: ModifyProps) => {
  const [reviewInput, setReviewInput] = useState('');
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]); // 선택한 이미지
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 선택한 이미지들의 미리보기

  const fileSelector = useRef<HTMLInputElement>(null);

  const postDisabled = !reviewInput || !reviewId || rating < 1;

  const { mutate } = useUpdateMyReview();
  const modifyMyReview = () => {
    if (postDisabled) return;

    mutate(
      {
        reviewId,
        content: reviewInput,
        rating: rating,
        images: files ?? undefined,
      },
      {
        onSuccess: () => {
          onClose();
          setModifyCompleteOpen(true);
        },
        onError: (e) => {
          console.error('리뷰 수정 실패: ' + e);
        },
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArr = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArr]);
    const urls = fileArr.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...urls]);

    e.target.value = '';
  };

  const handleRemoveImage = (idx: number) => {
    URL.revokeObjectURL(previewUrls[idx]);

    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClose = () => {
    setReviewInput('');
    setRating(0);
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviewUrls([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} className="bg-white text-center">
      <h3 className="mb-2 text-center text-2xl font-bold text-[var(--gray-8)]">리뷰 수정</h3>
      <StarRate
        rate={1}
        isEditable={true}
        className="mb-7 justify-center"
        starRating={(r) => setRating(r)}
      />
      <div className="relative mb-5 h-[176px] rounded-ee-[30px] rounded-ss-[30px] bg-[var(--gray-1)]">
        <textarea
          className="h-full w-full resize-none rounded-ee-[30px] rounded-ss-[30px] bg-transparent p-5 pr-10 pt-3 text-xs"
          value={reviewInput}
          placeholder="리뷰를 입력해주세요"
          onChange={(e) => setReviewInput(e.target.value)}
        />
        <span className="absolute right-2 top-2">&times;</span>
      </div>

      {previewUrls.length === 0 ? (
        <button
          className="flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--gray-1)] text-sm font-bold text-[var(--gray-8)]"
          onClick={() => fileSelector.current?.click()}
        >
          <img src={camera} />
          사진 첨부하기
        </button>
      ) : (
        <div className="flex max-w-[300px] items-center gap-2 overflow-x-auto">
          {previewUrls.map((url, idx) => (
            <div key={url} className="relative shrink-0 rounded-lg">
              <img src={url} className="aspect-square w-[80px] rounded-lg" />
              <span
                className="absolute right-1 top-0 cursor-pointer"
                onClick={() => handleRemoveImage(idx)}
              >
                &times;
              </span>
            </div>
          ))}
          <div className="flex w-[80px] shrink-0 items-center justify-center">
            <div
              className="relative aspect-square w-[50%] cursor-pointer rounded-full border-2 border-[var(--gray-4)]"
              onClick={() => fileSelector.current?.click()}
            >
              <img
                src={plus}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileSelector}
        accept="image/*"
        multiple
        onChange={(e) => handleFileSelect(e)}
      />
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--gray-1)] font-bold text-[var(--gray-7)]"
          onClick={() => handleClose()}
        >
          취소
        </button>
        <button
          className={`h-[44px] flex-1 rounded-[10px] font-bold ${!postDisabled ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-7)]'}`}
          onClick={modifyMyReview}
          disabled={postDisabled}
        >
          완료
        </button>
      </div>
    </Modal>
  );
};

export const DeleteModal = ({
  isOpen,
  onClose,
  restName,
  createdAt,
  reviewId,
  setDeleteCompleteOpen,
}: DeleteProps) => {
  const { mutate } = useDeleteMyReview();

  const deleteMyReview = () => {
    if (!reviewId) return;

    mutate(reviewId, {
      onSuccess: () => {
        setDeleteCompleteOpen(true);

        onClose();
      },
      onError: (e) => {
        console.error('리뷰 삭제 실패: ' + e);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} className="bg-white">
      <h3 className="mb-2 text-center text-xl font-bold text-[var(--gray-8)]">
        리뷰를 삭제하시겠습니까?
      </h3>
      <p className="mb-1 text-center text-sm font-medium text-[var(--gray-8)]">{restName}</p>
      <p className="text-center text-[10px] text-[var(--gray-6)]">{createdAt} 작성</p>
      <div className="mt-5 flex w-full gap-1">
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--gray-1)] font-bold text-[var(--gray-8)]"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="h-[44px] flex-1 rounded-[10px] bg-[var(--primary)] font-bold text-white"
          onClick={deleteMyReview}
        >
          삭제
        </button>
      </div>
    </Modal>
  );
};

export const ModifyComplete = ({ isOpen, onClose }: ModalProps) => (
  <Modal isOpen={isOpen}>
    <h3 className="mb-2 text-center text-2xl font-bold text-[var(--gray-8)]">수정완료</h3>
    <p className="mb-5 text-center font-medium text-[var(--gray-8)]">수정이 완료되었습니다.</p>
    <Button value="확인" className="bg-[var(--gray-1)] shadow-none" onClick={onClose} />
  </Modal>
);

export const DeleteCompleteModal = ({ isOpen, onClose }: ModalProps) => (
  <Modal isOpen={isOpen}>
    <h3 className="mb-2 text-center text-2xl font-bold text-[var(--gray-8)]">삭제완료</h3>
    <p className="mb-5 text-center font-medium text-[var(--gray-8)]">리뷰가 삭제되었습니다.</p>
    <Button value="확인" className="bg-[var(--gray-1)] shadow-none" onClick={onClose} />
  </Modal>
);
