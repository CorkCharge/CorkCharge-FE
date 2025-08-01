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

interface detailProps {
  name: string;
  rating: number;
  alias: string;
  isOpen: boolean;
  time: string;
}

const handleRequest = () => {
  console.log('해주세요창 이동');
  // navigate('/request');
};

const DetailHeader = ({ name, rating, alias, isOpen, time }: detailProps) => {
  const navigate = useNavigate();

  // const [openModal, setOpenModal] = useState<boolean>(false);
  // const handleModal = () => {
  //   setOpenModal(true);
  // };
  const [openCallModal, setOpenCallModal] = useState<boolean>(false);
  const handleCallModal = () => {
    setOpenCallModal(true);
  };
  const [openKeepModal, setOpenKeepModal] = useState<boolean>(false);
  const handleKeepStore = () => {
    //Todo: 저장하기 기능
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
  const location = useLocation();
  useEffect(() => {
    if (location.state?.openReviewModal) {
      setOpenReviewModal(true);
    }

    // state 초기화 (새로고침 시 안 뜨게)
    navigate('/detailInfo', { replace: true });
  }, [location.state]);

  //건의하기 후 돌아와서 모달창
  const [completeFb, setCompleteFb] = useState<boolean>(false);
  useEffect(() => {
    if (location.state?.completeFb) {
      setOpenFbModal(false);
      setCompleteFb(true);
    }

    // state 초기화 (새로고침 시 안 뜨게)
    navigate('/detailInfo', { replace: true });
  }, [location.state]);

  //전화하기 버튼의 기능
  return (
    <div className="flex w-[393px] flex-col">
      <img src="https://placehold.co/393X197" />
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
        <div className="flex w-[100px] flex-col items-center justify-center gap-1">
          <img className="flex h-[16px] w-[16px] items-center justify-center" src={share} />
          <div className="text-[10px] text-[#80818B]">공유하기</div>
        </div>
      </div>
      <div className="h-[8px] bg-[#F3F3F6]"></div>
      {openCallModal && (
        <Modal
          mainContent="02-450-1234"
          option1="전화하기"
          option2="번호 복사하기"
          //Todo: 전화하기 기능 추가하기?
          handleOpt1Click={() => setOpenCallModal(false)}
          //Todo: 복사 기능 추가하기
          handleOpt2Click={() => setOpenCallModal(false)}
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
    </div>
  );
};

export default DetailHeader;
