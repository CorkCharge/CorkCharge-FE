import { useState } from 'react';

import { Input } from '../common/Input';
import camera from '@/shared/components/myPage/images/camera.png';

const TYPE = ['콜키지 정보 오류', '가게 정보 오류', '기타'];

function WriteContact() {
  const [contactType, setContactType] = useState(0);
  const renderType = () =>
    TYPE.map((type, idx) => (
      <span
        className={`rounded-[20px] px-4 py-2 ${idx === contactType ? 'bg-[var(--primary)] text-white' : 'bg-[var(--gray-1)] text-[var(--gray-8)]'}`}
        onClick={() => setContactType(idx)}
      >
        {type}
      </span>
    ));
  return (
    <>
      <Input placeholder="문의 제목을 입력해주세요" className="mt-10" />
      <div className="mt-3 flex gap-1 px-2 text-sm font-medium">{renderType()}</div>
      {/* <div className="mt-4 px-2 text-sm font-medium">
        <span className="rounded-[20px] bg-[var(--gray-1)] px-4 py-2">콜키지 정보 오류</span>
        <span>가게 정보 오류</span>
        <span>기타</span>
      </div> */}
      <textarea
        className="mt-3 h-[300px] w-full resize-none rounded-2xl bg-[var(--gray-1)] px-8 py-5"
        placeholder="문의 내용을 입력해주세요"
        name="content"
      ></textarea>
      <button className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)] bg-white font-bold text-[var(--primary)]">
        <img src={camera} className="h-[22px] w-[25px]" />
        사진 첨부하기
      </button>
      <button className="fixed bottom-9 left-10 right-10 mx-auto h-[48px] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white">
        등록하기
      </button>
    </>
  );
}

export default WriteContact;
