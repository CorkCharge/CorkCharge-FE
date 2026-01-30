import { useState } from 'react';

import Modal from '../common/Modal';
import Button from '../common/Button';
import { writeSuggestion } from '@/shared/apis/suggestion/suggestion.api';

interface ContactModalProps {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (_: boolean) => void;
  restaurantName: string;
  completeModalOpen: (_: boolean) => void;
}

function ContactModal({
  isContactModalOpen,
  setIsContactModalOpen,
  restaurantName,
  completeModalOpen,
}: ContactModalProps) {
  const [contactContent, setContactContent] = useState('');
  const [contactOption, setContactOption] = useState(true); // true: 콜키지정보오류, false: 가게 정보 오류
  const [isPending, setIspending] = useState(false);

  // 문의하기 생성
  const postSuggestion = async () => {
    if (isPending) return;
    const option = contactOption ? 'CORKAGE_ERROR' : 'RESTAURANT_INFORMATION_ERROR';

    setIspending(true);
    try {
      await writeSuggestion(`${restaurantName} 관련 문의`, contactContent, option);
      setContactContent('');
      setIsContactModalOpen(false);
      completeModalOpen(true);
    } catch (e) {
      console.error('문의하기 생성 중 오류 발생: ' + e);
    } finally {
      setIspending(true);
    }
  };

  return (
    <Modal
      isOpen={isContactModalOpen}
      hasCloseButton={true}
      onClose={() => setIsContactModalOpen(false)}
    >
      <span className="inline-block w-full text-center text-2xl font-bold text-[var(--gray-8)]">
        문의하기
      </span>
      <div className="my-4 flex justify-center gap-2">
        <button
          className={`rounded-[20px] px-4 py-2 text-sm font-medium ${contactOption ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)]'}`}
          onClick={() => setContactOption(true)}
        >
          콜키지 정보 오류
        </button>
        <button
          className={`rounded-[20px] px-4 py-2 text-sm font-medium ${!contactOption ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)]'}`}
          onClick={() => setContactOption(false)}
        >
          가게 정보 오류
        </button>
      </div>
      <div className="relative">
        <textarea
          className="mb-4 min-h-[192px] w-full resize-none rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] p-4 pr-6 text-xs focus:outline-none"
          placeholder="건의 내용을 입력해주세요"
          value={contactContent}
          onChange={(e) => setContactContent(e.target.value)}
        ></textarea>
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-black"
          onClick={() => setContactContent('')}
        >
          &times;
        </button>
      </div>

      <Button
        value="제출하기"
        className="bg-[var(--primary)] text-white shadow-none disabled:bg-[var(--gray-1)] disabled:text-[var(--gray-6)]"
        disabled={!contactContent}
        onClick={postSuggestion}
      />
    </Modal>
  );
}

export default ContactModal;
