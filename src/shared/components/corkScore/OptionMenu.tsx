// import React from 'react'
import { useState } from 'react';
import etc from '../../assets/detailPageImgs/etc.svg';
import shareIcon from './assets/share.svg';
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';

const OptionMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  //   const [selected, setSeleted]=useState<string||null>(null);
  const [share, setShare] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  //   const options=['공유하기', '수정하기', '삭제하기']
  //bg-[#F3F3F6]
  return (
    <div className="relative">
      <img src={etc} className="cursor-pointer shadow-xl" onClick={() => setOpen(!open)} />
      {open && (
        <ul className="absolute right-0 top-5 flex h-[86px] w-[102px] items-center justify-center gap-1 overflow-hidden rounded-xl bg-[#F3F3F6] shadow-xl">
          <div className={`flex cursor-pointer flex-col items-center justify-center text-[12px]`}>
            <li
              className={`mt-1 flex w-[80px] items-center justify-center gap-1 border border-x-0 border-t-0 border-[#DBDDE1] pb-1 ${share ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              공유하기
              <img src={shareIcon} className="h-[15px] w-[15px]" />
            </li>
            <li
              className={`mt-1 flex w-[80px] items-center justify-center gap-2 border border-x-0 border-t-0 border-[#DBDDE1] pb-1 ${edit ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              수정하기
              <img src={editIcon} />
            </li>
            <li
              className={`mt-1 flex w-[80px] items-center justify-center gap-2 pb-1 ${remove ? 'text-[#90212A]' : 'text-[#9FA2AA]'}`}
            >
              삭제하기
              <img src={deleteIcon} />
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};
export default OptionMenu;
