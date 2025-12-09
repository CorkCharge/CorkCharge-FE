import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';

import loudSpeaker from '@/shared/components/notification/images/loudspeaker.png';
import whiteArrow from '@/shared/assets/arrow.svg';
import grayArrow from '@/shared/assets/right_arrow.svg';

function Notification() {
  const navigate = useNavigate();

  const gotoPost = () => {
    navigate('/notification/1');
  };

  const renderNotiPosts = () =>
    [...new Array(5)].map(() => (
      <div
        className="relative flex cursor-pointer items-center gap-5 border-b border-[var(--gray-3)] p-4"
        onClick={gotoPost}
      >
        <span className="rounded-[20px] bg-[var(--gray-2)] px-4 py-2 text-sm font-medium">
          EVENT
        </span>
        <div className="flex flex-col justify-center font-medium">
          <p className="text-[var(--gray-8)]">후기 남기고 커피받자</p>
          <span className="text-[10px] text-[var(--gray-4)]">2025년 05월 17일</span>
        </div>
        <img src={grayArrow} className="absolute right-4 top-1/2 h-4 w-[9px] -translate-y-1/2" />
      </div>
    ));

  return (
    <div className="relative">
      <Header type="back" title="알림" className="mx-4" backFn={() => navigate('/home')} />

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
        <img
          src={whiteArrow}
          className="absolute right-4 top-1/2 h-5 w-[11px] -translate-y-1/2 cursor-pointer"
        />
      </div>

      <div>{renderNotiPosts()}</div>

      {/* empty state */}
      {/* <p className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
        알림이 없습니다
      </p> */}
    </div>
  );
}

export default Notification;
