import { Input } from '../common/Input';
import camera from '@/shared/components/myPage/images/camera.png';

function WriteContact() {
  return (
    <>
      <Input placeholder="문의 제목을 입력해주세요" className="mt-10" />
      <textarea
        className="mt-5 h-[300px] w-full resize-none rounded-2xl bg-[var(--gray-1)] px-8 py-5"
        placeholder="문의 내용을 입력해주세요"
        name="content"
      ></textarea>
      <button className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)] bg-white font-bold text-[var(--primary)]">
        <img src={camera} className="h-[22px] w-[25px]" />
        사진 첨부하기
      </button>
      <button className="fixed bottom-9 left-10 right-10 h-[48px] rounded-[10px] bg-[var(--primary)] font-bold text-white">
        등록하기
      </button>
    </>
  );
}

export default WriteContact;
