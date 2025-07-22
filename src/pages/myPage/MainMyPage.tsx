import { useRef } from 'react';

import Header from '@/shared/components/common/Header';
import { ControlLists, ControlItem } from '@/shared/components/myPage/ControlList';

import pencil from '@/shared/components/myPage/images/pencil.png';
import logo from '@/shared/components/myPage/images/small-logo.png';
import arrow from '@/shared/assets/images/arrow.png';
import plus from '@/shared/assets/images/plus.png';
import shakehand from '@/shared/assets/images/shakehand.png';
import check from '@/shared/assets/images/cork-check.png';

function MainMyPage() {
  const hasReview = useRef(true);
  const isMaster = useRef(true);

  const renderReviews = () =>
    [...new Array(4)].map((_, idx) => (
      <div
        key={idx}
        className="flex h-[168px] w-[30%] flex-none flex-col justify-end rounded-lg bg-black p-3 text-white"
      >
        <span className="text-[10px] font-medium">서울 광진구 화양동</span>
        <span className="text-sm font-bold">엘루이 피자</span>
      </div>
    ));

  const ReviewArea = () => {
    return (
      <>
        <div className="mt-5 flex gap-2 overflow-x-auto">{renderReviews()}</div>
      </>
    );
  };

  const NoneReview = () => {
    return (
      <>
        <p className="mt-5">코르크 차지에</p>
        <p>아직 아무도 남기지 않았어요.</p>
        <p>첫 리뷰, 지금 남겨보세요!</p>
      </>
    );
  };

  return (
    <main className="px-4">
      <Header title="마이페이지" />
      <div className="mx-auto mb-4 rounded-2xl bg-[var(--gray-1)] px-4 py-[21px]">
        <div className="relative flex gap-[22px] pb-5">
          {/* <img src="" /> */}
          <div className="flex size-16 items-center justify-center rounded-[50%] bg-[var(--gray-4)]">
            <img src={pencil} className="size-7" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-1 text-xl font-bold">
              애주가 코르크님
              {isMaster.current && <img src={logo} className="h-[21px]" />}
            </p>
            <p className="text-sm font-medium text-[#80818B]">tempididid</p>
          </div>
          <img src={arrow} className="absolute right-5 top-7 h-4" />
        </div>

        <div className="-mx-4 h-[1px] bg-[var(--gray-4)]"></div>

        <div className="flex items-center gap-[22px] pl-2 pt-4">
          <div className="flex size-[30px] items-center justify-center rounded-[50%] bg-[var(--gray-4)]">
            <img src={plus} className="size-[14px]" />
          </div>
          <p className="font-bold">콜키지 정보 등록하기</p>
        </div>
      </div>

      <div className="flex h-20 w-full justify-center gap-3">
        <div className="flex h-full flex-1 items-center justify-center rounded-2xl bg-[var(--gray-1)]">
          <img src={shakehand} className="size-[66px]" />
          <span>해주세요</span>
        </div>
        <div className="flex h-full flex-1 items-center justify-center rounded-2xl bg-[var(--gray-1)]">
          <img src={check} className="size-[36px]" />
          <span>나의 예약</span>
        </div>
      </div>

      <div className="relative mb-10 mt-10">
        <span className="font-bold">나의 리뷰</span>
        <img src={arrow} className="absolute right-3 top-1 h-4 w-[9px]" />
        {hasReview.current ? <ReviewArea /> : <NoneReview />}
      </div>

      <div className="-mx-4 h-2 bg-[var(--gray-1)]"></div>

      <ControlLists>
        <ControlItem>알림 설정</ControlItem>
        <ControlItem>약관 및 개인정보 처리방침</ControlItem>
        <ControlItem>문의하기</ControlItem>
      </ControlLists>

      <div className="mt-10 text-center">
        <span className="font-medium text-[var(--gray-6)] underline underline-offset-2">
          로그아웃
        </span>
      </div>
    </main>
  );
}

export default MainMyPage;
