// import React from 'react'
import smallGlass from '../../assets/smallGlass.svg';
import star from '../../assets/star.svg';
import call from '../../assets/detailPageImgs/call.svg';
import bubble from '../../assets/detailPageImgs/bubble.svg';
import share from '../../assets/detailPageImgs/share.svg';
import keep from '../../assets/detailPageImgs/keep.svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import Feedback from './Feedback';
import { useNavigate } from 'react-router-dom';
import Share from './Share';

interface detailProps {
  resId: number;
  name: string;
  rating: number;
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
  alias,
  isOpen,
  time,
  phone,
  mainImageUrl,
}: detailProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { storeName, address, restaurantId } = location.state || {
    storeName: '매장명 없음',
    address: '주소 없음',
    restaurantId: 0,
  };

  const handleRequest = () => {
    console.log('해주세요창 이동');
    // navigate(`doit/request/${restaurantId}`);
    navigate(`/doit/request/${resId}`, {
      state: {
        storeName,
        address,
        restaurantId,
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

  const handleCopyLink = () => {
    try {
      const pathURL = `http://localhost:5173/detailInfo/${resId};`;
      console.log(pathURL);
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
      // alert('클립보드 복사에 실패하였습니다.');
    }
  };

  return (
    <div className="flex w-[393px] flex-col">
      {/* <img src="https://placehold.co/393X197" /> */}
      <img
        src={mainImageUrl ? mainImageUrl : 'https://placehold.co/393X197'}
        className="h-[197px] w-[393px]"
      />
      {/* 사진 없으면 기본 사진으로 대체 */}
      <div className="pb-2 pt-2">
        <div className="text-[24px] font-bold">{name}</div>
        <div className="flex items-center gap-2">
          <div>콜키지스코어</div>
          <img src={star} />
          <span className="text-[16px]">{rating}</span>
          <span className="text-[14px] text-[#749755]">{alias}</span>
        </div>
        <div className="flex items-center gap-2 text-[14px]">
          <div>{isOpen ? '영업중' : '영업종료'}</div>
          <div className="text-[#80818B]">영업시간 {time} 영업종료</div>
        </div>
      </div>
      <div className="mb-2 mt-2 flex gap-2 border border-x-0 border-t-0 pb-4">
        <button
          onClick={handleRequest}
          // onClick={handleModal}
          className="flex h-[80px] w-[176px] items-center justify-center gap-2 rounded-[16px] bg-[#F3F3F6]"
        >
          <div className="flex items-center justify-center gap-3 text-[16px] font-semibold text-[#35353F]">
            <img src={smallGlass}></img>
            <div>해주세요</div>
          </div>
        </button>
        <button
          onClick={handleKeepStore}
          className="flex h-[80px] w-[176px] items-center justify-center gap-2 rounded-[16px] bg-[#F3F3F6]"
        >
          <div className="flex items-center justify-center gap-3 text-[16px] font-semibold text-[#35353F]">
            <img src={keep}></img>
            <div>저장</div>
          </div>
        </button>
      </div>
      <div className="flex h-[50px] w-[393px] justify-between pb-4 pl-[36px] pr-[36px] pt-2">
        <div
          onClick={handleCallModal}
          className="flex w-[100px] cursor-pointer flex-col items-center justify-center gap-1"
        >
          <img className="h-[16px] w-[16px]" src={call} />
          <div className="text-[10px] text-[#80818B]">전화하기</div>
        </div>
        <div
          onClick={handleFeedback}
          className="flex w-[100px] cursor-pointer flex-col items-center justify-center gap-1 border border-y-0 border-[#F3F3F6]"
        >
          <img className="flex h-[16px] w-[16px] items-center justify-center" src={bubble} />
          <div className="text-[10px] text-[#80818B]">건의하기</div>
        </div>
        <div
          onClick={handleShare}
          className="flex w-[100px] cursor-pointer flex-col items-center justify-center gap-1"
        >
          <img className="flex h-[16px] w-[16px] items-center justify-center" src={share} />
          <div className="text-[10px] text-[#80818B]">공유하기</div>
        </div>
      </div>
      <div className="h-[8px] bg-[#F3F3F6]"></div>
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
          subContent="엔비햄버거를 저장했습니다♥"
          info={['저장 수 100개가 되면', '신규 콜키지 우선순위로 등록됩니다.', '현재 저장 수: 84']}
          option1="확인"
          option2="공유하기"
          handleOpt1Click={() => setOpenKeepModal(false)}
          //Todo: 저장 기능 추가하기
          handleOpt2Click={() => setOpenKeepModal(false)}
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
          handleOpt1Click={() => handleCopyLink()}
          handleOpt2Click={() => setOpenShareModal(false)}
        />
      )}
    </div>
  );
};

export default DetailHeader;
