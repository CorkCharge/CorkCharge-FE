// import React from 'react'
import { useState } from 'react';
import etc from '../../assets/detailPageImgs/etc.svg';
import shareIcon from './assets/share.svg';
// import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';
import Share from '@/shared/components/detail/Share';
import Modal from '../detail/Modal';

interface OptionMenuProps {
  resId?: number;
  resName?: string;
}

const OptionMenu = ({ resId, resName }: OptionMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [share] = useState<boolean>(false);
  const [remove] = useState<boolean>(false);

  //링크 공유하기 기능
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const handleShare = () => {
    console.log('공유하기 창 띄우기');
    // console.log('가게명: ' + resName);
    // console.log('가게id: ' + resId);
    setOpenShareModal(true);
  };

  const baseURL = window.location.origin;
  const pathURL = `${baseURL}/detail-info/${resId}`;
  const handleCopyLink = () => {
    try {
      console.log('url: ' + pathURL);
      navigator.clipboard.writeText(pathURL);
      setOpenShareModal(false);
      alert('링크가 클립보드에 복사되었습니다: ');
    } catch {
      console.error('복사 실패');
      // alert('클립보드 복사에 실패하였습니다.');
    }
  };

  //리뷰 삭제하기 기능
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDelete = () => {
    console.log('삭제하기 창 띄우기');
    setOpenDeleteModal(true);
  };

  const handleDeleteReview = () => {
    try {
      console.log('리뷰 삭제하기');

      setOpenDeleteModal(false);
    } catch {
      console.error('리뷰 삭제 실패');
    }
  };

  return (
    <div className="relative">
      <img src={etc} className="cursor-pointer shadow-xl" onClick={() => setOpen(!open)} />
      {open && (
        <ul className="absolute right-0 top-5 flex h-[66px] w-[102px] items-center justify-center gap-1 overflow-hidden rounded-xl bg-[#F3F3F6] shadow-xl">
          <div className={`flex cursor-pointer flex-col items-center justify-center text-[12px]`}>
            <li
              onClick={handleShare}
              className={`mt-1 flex w-[80px] items-center justify-center gap-1 border border-x-0 border-t-0 border-[#DBDDE1] pb-1 ${share ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              공유하기
              <img src={shareIcon} className="h-[15px] w-[15px]" />
            </li>
            {/* <li
              className={`mt-1 flex w-[80px] items-center justify-center gap-2 border border-x-0 border-t-0 border-[#DBDDE1] pb-1 ${edit ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              수정하기
              <img src={editIcon} />
            </li> */}
            <li
              onClick={handleDelete}
              className={`mt-1 flex w-[80px] items-center justify-center gap-2 pb-1 ${remove ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              삭제하기
              <img src={deleteIcon} />
            </li>
          </div>
        </ul>
      )}
      {openShareModal && (
        <Share
          copylink={pathURL}
          restaurantName={resName ?? '이름없음'}
          handleOpt1Click={() => handleCopyLink()}
          handleOpt2Click={() => setOpenShareModal(false)}
        />
      )}
      {openDeleteModal && (
        <Modal
          subContent="리뷰가 삭제되었습니다."
          option1="확인"
          handleOpt1Click={() => {
            handleDeleteReview();
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};
export default OptionMenu;
