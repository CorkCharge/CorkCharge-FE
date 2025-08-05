import Header from '@/shared/components/common/Header';

import loudSpeaker from '@/shared/components/notification/images/loudspeaker.png';
import whiteArrow from '@/shared/assets/arrow.svg';
import Button from '../../common/Button';

function NotiPost() {
  return (
    <div>
      <Header title="알림" type="back" className="mx-4" />

      <div
        className="relative flex h-[72px] items-center gap-5 px-4"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%)',
        }}
      >
        <img src={loudSpeaker} className="h-[22px] w-6" />
        <div className="flex flex-col font-medium text-white">
          <p>깍뚝 건대점의 콜키지가 등록되었어요!</p>
          <span className="text-[10px]">2025년 05월 17일</span>
        </div>
        <img src={whiteArrow} className="absolute right-4 top-1/2 h-5 w-[11px] -translate-y-1/2" />
      </div>

      <div className="mx-8 mt-6">
        <div className="items-cenrte flex justify-between">
          <span className="rounded-[20px] bg-[rgba(144,33,70,0.15)] px-4 py-2 font-medium text-[var(--primary)]">
            EVENT
          </span>
          <span className="flex items-center text-sm font-medium text-[var(--gray-4)]">
            2025년 05월 17일
          </span>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[var(--gray-8)]">
            타이틀타이틀타이틀타이틀타이틀
          </h1>
          <h2 className="text-xl font-medium text-[var(--gray-8)]">sub타이틀sub타이틀</h2>
          <p className="mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
          <Button
            value="닫기"
            className="fixed bottom-10 left-10 right-10 mx-auto w-[80%] max-w-[480px] text-[var(--gray-8)]"
          />
        </div>
      </div>
    </div>
  );
}

export default NotiPost;
