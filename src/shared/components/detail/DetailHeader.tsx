import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { bookmarkRequest, deleteRequest } from '@/shared/apis/bookmark/bookmarkApi';
import Modal from './Modal';
import Feedback from './Feedback';
import Share from './Share';

import smallGlass from '../../assets/smallGlass.svg';
import star from '../../assets/star.svg';
import call from '../../assets/detailPageImgs/call.svg';
import bubble from '../../assets/detailPageImgs/bubble.svg';
import share from '../../assets/detailPageImgs/share.svg';
import keep from '../../assets/detailPageImgs/keep.svg';
import arrow from '@/shared/assets/whiteArrow.svg';

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

const DetailHeader = ({
  resId,
  name,
  rating,
  adr,
  alias,
  isOpen,
  time,
  phone,
  mainImageUrl,
}: detailProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isKeep, setIsKeep] = useState(false);

  const handleRequest = () => {
    console.log('해주세요창 이동: ', location.state);
    // navigate(`doit/request/${restaurantId}`);
    navigate(`/doit/request/${resId}`, {
      state: {
        storeName: name ?? '매장명 없음',
        address: adr ?? '주소 없음',
        restaurantId: resId ?? 0,
      },
    });
  };

  const [openCallModal, setOpenCallModal] = useState<boolean>(false);
  const handleCallModal = () => {
    setOpenCallModal(true);
  };
  const [openKeepModal, setOpenKeepModal] = useState<boolean>(false);
  const handleKeepStore = () => {
    console.log('저장완료');
    setOpenKeepModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDeleteStore = () => {
    console.log('저장취소완료');
    setOpenDeleteModal(true);
  };
  const [openFbModal, setOpenFbModal] = useState<boolean>(false);
  const handleFeedback = () => {
    console.log('건의하기창 띄우기');
    setOpenFbModal(true);
  };

  //리뷰작성 후 돌아와서 모달창
  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);
  // const location = useLocation();
  useEffect(() => {
    if (location.state?.openReviewModal) {
      setOpenReviewModal(true);
    }

    // state 초기화 (새로고침 시 안 뜨게)
    navigate(`/detailInfo/${resId}`, { replace: true });
  }, [location.state]);

  //건의하기 후 돌아와서 모달창
  const [completeFb, setCompleteFb] = useState<boolean>(false);
  useEffect(() => {
    if (location.state?.completeFb) {
      setOpenFbModal(false);
      setCompleteFb(true);
    }

    // state 초기화 (새로고침 시 안 뜨게)
    navigate(`/detailInfo/${resId}`, { replace: true });
  }, [location.state]);

  //전화번호 복사하기 기능
  const handleCopyPhone = (phone: string) => {
    try {
      navigator.clipboard.writeText(phone);
      setOpenCallModal(false);
      alert('클립보드에 복사되었습니다: ' + phone);
    } catch {
      console.error('복사 실패');
      // alert('클립보드 복사에 실패하였습니다.');
    }
  };

  //링크 공유하기 기능
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const handleShare = () => {
    console.log('공유하기 창 띄우기');
    setOpenShareModal(true);
  };

  const baseURL = window.location.origin;
  const pathURL = `${baseURL}/detailInfo/${resId}`;
  const handleCopyLink = () => {
    try {
      // const pathURL = `http://localhost:5173/detailInfo/${resId};`;
      console.log(pathURL);
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
      // alert('클립보드 복사에 실패하였습니다.');
    }
  };

  //가게 저장하기
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const keepStore = async () => {
    try {
      const res = await bookmarkRequest({
        targetId: resId ?? 0,
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
        targetId: resId ?? 0,
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
        handleDeleteStore();
      } else {
        await keepStore();
        setIsBookmarked(true);
        handleKeepStore();
      }
    } catch (err) {
      console.log('북마크 토글 실패:', err);
    } finally {
      setPending(false);
    }
  };

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
        >
          <img src={share} />
          <span className="text-sm font-medium text-[var(--gray-7)]">공유</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
        >
          <img src={call} />
          <span className="text-sm font-medium text-[var(--gray-7)]">전화</span>
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded-full px-4"
          style={{ border: 'solid 1px var(--gray-3)' }}
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

      {openCallModal && (
        <Modal
          mainContent={phone}
          option1="번호 복사하기"
          handleOpt1Click={() =>
            // setOpenCallModal(false)
            handleCopyPhone(phone)
          }
        />
      )}
      {openKeepModal && (
        <Modal
          mainContent="저장완료"
          subContent={`${name}(을)를 저장했습니다♥`}
          // subContent="엔비햄버거를 저장x했습니다♥"
          // info={['저장 수 100개가 되면', '신규 콜키지 우선순위로 등록됩니다.', '현재 저장 수: {']}
          option1="확인"
          option2="공유하기"
          handleOpt1Click={() => setOpenKeepModal(false)}
          //Todo: 저장 기능 추가하기
          handleOpt2Click={() => setOpenKeepModal(false)}
        />
      )}
      {openDeleteModal && (
        <Modal
          mainContent="저장취소"
          subContent="저장을 취소했습니다"
          option1="확인"
          handleOpt1Click={() => setOpenDeleteModal(false)}
        />
      )}
      {openReviewModal && (
        <Modal
          mainContent="작성완료"
          subContent="소중한 리뷰 감사합니다 ♥"
          option1="확인"
          handleOpt1Click={() => setOpenReviewModal(false)}
        />
      )}
      {openFbModal && (
        <Feedback
          restaurantId={resId}
          mainContent="건의하기"
          option="제출하기"
          handleOptClick={() => setOpenFbModal(false)}
        />
      )}
      {completeFb && (
        <Modal
          mainContent="건의완료"
          subContent="소중한 의견 감사합니다♥"
          option1="확인"
          handleOpt1Click={() => setCompleteFb(false)}
        />
      )}
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

export default DetailHeader;
