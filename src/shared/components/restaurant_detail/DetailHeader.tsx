import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import GroupSelector from '@/shared/components/home/GroupSelector';
import GroupList from '@/shared/components/home/GroupList';
import Modal from '../common/Modal';
import Button from '../common/Button';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import smallGlass from '../../assets/smallGlass.svg';
import star from '../../assets/star.svg';
import call from '../../assets/detailPageImgs/call.svg';
import bubble from '../../assets/detailPageImgs/bubble.svg';
import share from '../../assets/detailPageImgs/share.svg';
import arrow from '@/shared/assets/whiteArrow.svg';
import logo from '@/shared/assets/images/logo.svg';
import check from './assets/check.svg';
import notsave from '../storecard/notsave.svg';
import save from '../storecard/save.svg';
import MultiSaveMarker from '../../assets/common/multiSaveMarker.svg';
import { getTodayOperatingHours } from '@/shared/utils/operatingHours';

interface detailProps {
  resId: number;
  name: string;
  rating: number;
  //adr: string;
  //alias?: string;
  isOpen: boolean;
  time: string;
  phone: string;
  mainImageUrl: string | null;
  corkageOption: string[];
  corkagePrice: string;
  isScrap: boolean; // [중요] 부모로부터 현재 스크랩 상태를 받아야 함 (restaurant.scrap)
}

const DetailHeader = ({
  resId,
  name,
  rating,
  isOpen,
  time,
  phone,
  mainImageUrl,
  corkageOption,
  corkagePrice,
  isScrap,
}: detailProps) => {
  const [isKeep, setIsKeep] = useState(isScrap);
  const displayRating = Number(rating).toFixed(1);
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // 문의하기 modal 열기
  const [contactContent, setContactContent] = useState('');
  const [contactOption, setContactOption] = useState(true); // true: 콜키지정보오류, false: 가게 정보 오류
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // 공유하기 modal 열기
  const [isCallModalOpen, setIsCallModalOpen] = useState(false); // 전화하기 modal 열기
  const [isCopiedModalOpen, setIsCopiedModalOpen] = useState(false); // 복사완료 modal 열기
  const [isOverflow, setIsOverflow] = useState(false); // 버튼 그룹 overflow 감지
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedStores = useBookmarkStore((state) => state.selectedStores);

  useEffect(() => {
    // 1. 전역 스토어(Zustand)에 현재 매장에 대한 데이터가 한 번이라도 담겼다면 (저장 혹은 수정 이력 있음)
    if (resId in selectedStores) {
      // 해당 매장이 속한 그룹 배열이 비어있지 않은지 확인 (더 정확한 체크)
      setIsKeep(selectedStores[resId].length > 0);
    }
    // 2. 스토어에 데이터가 없다면, 아직 이 세션에서 수정한 적이 없으므로 서버 값(isScrap)을 유지합니다.
    else {
      setIsKeep(isScrap);
    }
  }, [resId, selectedStores, isScrap]);

  const handleCloseGroupSelector = () => {
    setIsGroupSelectorOpen(false);
  };

  // 좌우 overflow 감지
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const checkOverflow = () => {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

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

    if (isMobile) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard.writeText(phone);
      setIsShareModalOpen(false);
      setIsCopiedModalOpen(true);
      setTimeout(() => setIsCopiedModalOpen(false), 1000);
    }
  };

  const getMarkerIcon = () => {
    const hasUserAction = resId in selectedStores;
    const groupIds = selectedStores[resId];

    // 사용자가 조작을 한 기록이 있다면, 스토어의 데이터만 보고 판단합니다.
    if (hasUserAction) {
      if (!groupIds || groupIds.length === 0) {
        return notsave; // 모든 그룹 해제 시 확실하게 notsave 반환
      }
      if (groupIds.length >= 2) {
        return MultiSaveMarker;
      }
      return save;
    }

    // 2. 조작 기록이 전혀 없는 초기 상태일 때만 부모의 scrap(isKeep) 상태를 따릅니다.
    return isKeep ? save : notsave;
  };

  return (
    <div className="relative flex w-full flex-col">
      <img
        src={arrow}
        className="absolute left-3 top-2 h-4 w-[9px] cursor-pointer"
        onClick={() => navigate(-1)}
      />

      {/* 가게 정보 */}
      <div className="felx-row relative flex justify-between pb-2 pt-2">
        <div>
          <div className="flex flex-row gap-[8px]">
            <div className="text-[24px] font-bold">{name}</div>
            <button onClick={() => setIsGroupSelectorOpen(true)}>
              <img
                src={getMarkerIcon()}
                alt={isKeep ? 'saved' : 'unsaved'}
                className="h-[32px] w-[32px]"
              />
            </button>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">콜키지리뷰</span>
            <img src={star} />
            <span className="ml-1 font-medium">{displayRating}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[14px]">
            <span className="font-semibold">{isOpen ? '영업중' : '영업종료'}</span>
            <span className="text-[#80818B]">{getTodayOperatingHours(time) || '정보 없음'}</span>
          </div>
        </div>
        <div>
          {mainImageUrl ? (
            <img src={mainImageUrl} className="h-[80px] w-full" />
          ) : (
            <div className="flex flex-row gap-[5px]">
              <div className="h-[80px] w-[80px] bg-gray-300"></div>
              <div className="h-[80px] w-[80px] bg-gray-300"></div>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div
        className={`mt-2 box-content flex h-9 gap-2 pb-4 ${isOverflow ? 'justify-start overflow-auto' : 'justify-center'}`}
        ref={ref}
      >
        <button
          className="flex shrink-0 items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
        >
          <img src={smallGlass} className="size-6" />
          <span className="text-sm font-medium text-[var(--primary)]">해주세요</span>
        </button>
        <button
          className="flex shrink-0 items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
          onClick={() => setIsShareModalOpen(true)}
        >
          <img src={share} />
          <span className="text-sm font-medium text-[var(--gray-7)]">공유</span>
        </button>
        <button
          className="flex shrink-0 items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
          onClick={() => setIsCallModalOpen(true)}
        >
          <img src={call} />
          <span className="text-sm font-medium text-[var(--gray-7)]">전화</span>
        </button>
        <button
          className="flex shrink-0 items-center justify-center gap-1 rounded-full px-4"
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
        <div className="flex gap-5 border-b py-2">
          <div className="min-w-[40px] font-bold">비용</div>
          <span>{corkagePrice}</span>
        </div>
        {corkageOption.length > 0 && (
          <div className="flex w-full gap-5 pb-2 pr-2 pt-2">
            <div className="min-w-[40px] font-bold">기타</div>
            <div>
              {corkageOption.map((option) => (
                <p>{option}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 문의하기 모달 */}
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

      {/* [추가] Detail 안에서 GroupSelector 직접 렌더링 */}
      <GroupSelector
        isOpen={isGroupSelectorOpen}
        topSnapVh={17.8}
        onClose={handleCloseGroupSelector}
      >
        <GroupList onClose={handleCloseGroupSelector} restaurantName={name} restaurantId={resId} />
      </GroupSelector>
    </div>
  );
};

export default DetailHeader;
