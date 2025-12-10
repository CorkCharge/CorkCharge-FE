import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Modal from '../common/Modal';
import Button from '../common/Button';

import smallGlass from '../../assets/smallGlass.svg';
import star from '../../assets/star.svg';
import call from '../../assets/detailPageImgs/call.svg';
import bubble from '../../assets/detailPageImgs/bubble.svg';
import share from '../../assets/detailPageImgs/share.svg';
import arrow from '@/shared/assets/whiteArrow.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from './assets/check.svg';

interface detailProps {
  resId: number;
  name: string;
  rating: number;
  adr: string;
  alias?: string;
  isOpen: boolean;
  time: string;
  phone: string;
  mainImageUrl: string | null;
}

const DetailHeader = ({ resId, name, rating, isOpen, time, phone, mainImageUrl }: detailProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isKeep, setIsKeep] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // 문의하기 modal 열기
  const [contactContent, setContactContent] = useState('');
  const [contactOption, setContactOption] = useState(true); // true: 콜키지정보오류, false: 가게 정보 오류
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [isCallModalOpen, setIsCallModalOpen] = useState(false); // 전화하기 modal 열기
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기

  // const location = useLocation();

  useEffect(() => {
    // state 초기화 (새로고침 시 안 뜨게)
    navigate(`/detailInfo/${resId}`, { replace: true });
  }, [location.state]);

  const keepMarker = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle
        cx="16"
        cy="16"
        r="15"
        fill={isKeep ? '#E75257' : 'none'}
        stroke={isKeep ? 'none' : 'var(--gray-3)'}
      />
      <path
        d="M10.7239 23.6525C10.4143 23.6525 10.1728 23.5764 9.99935 23.4242C9.82596 23.272 9.73926 23.058 9.73926 22.7821V10.3959C9.73926 9.71567 9.9591 9.20434 10.3988 8.86186C10.8385 8.51939 11.4949 8.34814 12.3681 8.34814H19.6322C20.5054 8.34814 21.1618 8.51939 21.6015 8.86186C22.0412 9.20434 22.261 9.71567 22.261 10.3959V22.7821C22.261 23.058 22.1744 23.272 22.0009 23.4242C21.8276 23.5764 21.586 23.6525 21.2763 23.6525C21.0473 23.6525 20.8336 23.5931 20.6355 23.4742C20.4435 23.3553 20.1369 23.1412 19.7158 22.832L16.0837 20.0851C16.028 20.0375 15.9723 20.0375 15.9165 20.0851L12.2845 22.832C11.8634 23.1459 11.5537 23.36 11.3556 23.4742C11.1574 23.5931 10.9468 23.6525 10.7239 23.6525Z"
        fill="white"
        stroke={isKeep ? 'none' : 'var(--gray-7)'}
        strokeWidth={1.5}
      />
    </svg>
  );

  // 공유 클릭 시 주소 복사
  const clipLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShareModalOpen(false);
    setIsCopiedModalOpen(true);
    setTimeout(() => setIsCopiedModalOpen(false), 1000);
  };

  // 전화 클릭 시 전화 이동 or 번호 복사
  const copyPhoneNumber = () => {
    // 사용자 기기 종류 확인
    const isMobile = /Android|iphone|ipad|ipod/i.test(navigator.userAgent);
    console.log(isMobile);

    if (isMobile) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard.writeText(phone);
      setIsShareModalOpen(false);
      setIsCopiedModalOpen(true);
      setTimeout(() => setIsCopiedModalOpen(false), 1000);
    }
  };

  return (
    <div className="relative flex w-full flex-col">
      {mainImageUrl ? (
        <img src={mainImageUrl} className="h-[197px] w-full" />
      ) : (
        <div className="grid grid-cols-2 gap-[1px]">
          <div className="aspect-square bg-gray-300"></div>
          <div className="grid grid-cols-2 gap-[1px]">
            <div className="aspect-square bg-gray-300"></div>
            <div className="aspect-square bg-gray-300"></div>
            <div className="aspect-square bg-gray-300"></div>
            <div className="aspect-square bg-gray-300"></div>
          </div>
        </div>
      )}
      <img
        src={arrow}
        className="absolute left-3 top-2 h-4 w-[9px] cursor-pointer"
        onClick={() => navigate(-1)}
      />

      {/* 가게 정보 */}
      <div className="relative px-4 pb-2 pt-2">
        <div className="text-[24px] font-bold">{name}</div>
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">콜키지리뷰</span>
          <img src={star} />
          <span className="ml-1 font-medium">{rating}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-[14px]">
          <span className="font-semibold">{isOpen ? '영업중' : '영업종료'}</span>
          <span className="text-[#80818B]">영업시간 {time} 영업종료</span>
        </div>
        <div
          className="absolute right-4 top-2 cursor-pointer"
          onClick={() => setIsKeep((prev) => !prev)}
        >
          {keepMarker}
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-2 box-content flex h-9 w-full justify-center gap-2 px-4 pb-4">
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
        >
          <img src={smallGlass} className="size-6" />
          <span className="text-sm font-medium text-[var(--primary)]">해주세요</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
          onClick={() => setIsShareModalOpen(true)}
        >
          <img src={share} />
          <span className="text-sm font-medium text-[var(--gray-7)]">공유</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
          onClick={() => setIsCallModalOpen(true)}
        >
          <img src={call} />
          <span className="text-sm font-medium text-[var(--gray-7)]">전화</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
          onClick={() => setIsContactModalOpen(true)}
        >
          <img src={bubble} />
          <span className="text-sm font-medium text-[var(--gray-7)]">문의</span>
        </button>
      </div>

      {/* 콜키지 정보 */}
      <div className="mb-7 w-full px-4">
        <div className="mt-2 border-b-2 pb-1 font-bold">콜키지 정보</div>
        <div className="flex gap-12 border-b py-2">
          <div className="font-bold">비용</div>
          <span>병당 1만원</span>
        </div>
        <div className="flex w-full gap-12 pb-2 pr-2 pt-2">
          <div className="font-bold">기타</div>
          <div>
            <p>잔 제공</p>
            <p>얼음 제공</p>
            <p>리뷰 이벤트 : 한 병 무료</p>
          </div>
        </div>
      </div>

      {/* 문의하기 모달 */}
      <Modal
        isOpen={isContactModalOpen}
        hasCloseButton={true}
        onClose={() => setIsContactModalOpen(false)}
        className=""
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
        />
      </Modal>

      {/* 공유하기 모달 */}
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

      {/* 전화하기 모달 */}
      <Modal
        isOpen={isCallModalOpen}
        hasCloseButton={true}
        onClose={() => setIsCallModalOpen(false)}
      >
        <span className="mb-4 inline-block w-full text-center text-2xl font-bold">{phone}</span>
        <Button
          value="번호 복사하기"
          className="bg-[var(--gray-1)] text-[var(--gray-8)] shadow-none"
          onClick={copyPhoneNumber}
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

export default DetailHeader;
