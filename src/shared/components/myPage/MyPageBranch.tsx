import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useMyPageStore from '@/shared/store/useMyPageStore';
import useFooterPropsStore from '@/shared/store/useFooterProps';

import apiClient from '@/shared/apis/apiClient';
import type { Review } from '@/shared/types/mypage';

import logo from '@/shared/components/myPage/images/small-logo.png';
import arrow from '@/shared/assets/images/arrow.png';
import plus from '@/shared/assets/images/plus.png';
import shakehand from '@/shared/assets/images/shakehand.png';
import check from '@/shared/assets/images/cork-check.png';
import naver from '@/shared/components/myPage/images/naver-white.png';
import { NaverLogIn } from '@/shared/apis/signIn/Naver';

const renderReviews = (reviews: Review[]) =>
  reviews.map((review, idx) => (
    <div
      key={idx}
      className={`flex h-[168px] w-[30%] flex-none flex-col justify-end rounded-lg p-3 text-white ${!review.thumbnailUrl && 'bg-black'}`}
      style={{
        backgroundImage: `url(${review.thumbnailUrl || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <span className="text-[10px] font-medium">{review.location}</span>
      <span className="text-sm font-bold">{review.restaurantName}</span>
    </div>
  ));

const ReviewArea = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      <div className="mt-5 flex gap-2 overflow-x-auto">{renderReviews(reviews)}</div>
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

export const LoggedInMyPage = () => {
  const isMaster = useRef(true);

  const navigate = useNavigate();

  // const { profile } = useProfileStore();
  const { myProfile, setMyProfile } = useMyPageStore();
  const { setFooterProps } = useFooterPropsStore();

  useEffect(() => {
    if (myProfile.socialId) return;

    apiClient
      .get('/users/page')
      .then((res) => {
        setMyProfile(res.data.data);
      })
      .catch((e) => console.error(e));
  }, [myProfile.socialId, setMyProfile]);

  const gotoReserVate = () => {
    navigate('/reservate');
    setFooterProps(2);
  };

  const enrollCorkage = () => {
    apiClient
      .get('/corkages/verify')
      .then((res) => {
        if (!res.data.success) throw new Error('OOPS');
        const { restaurantName, restaurantId, ...rest } = res.data.data;
        const stateObj = { storeName: restaurantName, restaurantId, ...rest };
        navigate(`/add/storecheck/${restaurantId}`, { state: stateObj });
      })
      .catch((e) => console.error('<권한 검증 실패> ' + e));
  };

  return (
    <>
      <div className="mx-auto mb-4 rounded-2xl bg-[var(--gray-1)] px-4 py-[21px]">
        <div className="relative flex gap-[22px] pb-5">
          <div
            className={`flex size-16 ${myProfile?.profile_image ? 'items-center justify-center' : 'rounded-[50%] bg-[var(--gray-4)]'}`}
          >
            {myProfile?.profile_image && (
              <img src={myProfile.profile_image} className="size-full rounded-full" />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p className="it ems-center flex gap-1 text-xl font-bold">
              {myProfile?.nickname}
              {isMaster.current && <img src={logo} className="h-[21px]" />}
            </p>
            <p className="text-sm font-medium text-[#80818B]">{myProfile?.socialId}</p>
          </div>
          <img
            src={arrow}
            className="absolute right-5 top-7 h-4 cursor-pointer"
            onClick={() => navigate('/my/modify')}
          />
        </div>

        <div className="-mx-4 h-[1px] bg-[var(--gray-4)]"></div>

        <div
          className="flex cursor-pointer items-center gap-[22px] pl-2 pt-4"
          onClick={enrollCorkage}
        >
          <div className="flex size-[30px] items-center justify-center rounded-[50%] bg-[var(--gray-4)]">
            <img src={plus} className="size-[14px]" />
          </div>
          <p className="font-bold">콜키지 정보 등록하기</p>
        </div>
      </div>

      <div className="flex h-20 w-full justify-center gap-3">
        <div
          className="flex h-full flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[var(--gray-1)]"
          onClick={() => navigate('/doit')}
        >
          <img src={shakehand} className="size-[66px]" />
          <span className="font-medium">해주세요</span>
        </div>
        <div
          className="flex h-full flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[var(--gray-1)]"
          onClick={gotoReserVate}
        >
          <img src={check} className="size-[36px]" />
          <span className="font-medium">나의 예약</span>
        </div>
      </div>

      <div className="relative mb-10 mt-10">
        <span className="font-bold">나의 리뷰</span>
        <img
          src={arrow}
          className="absolute right-3 top-1 h-4 w-[9px] cursor-pointer"
          onClick={() => navigate('/my/review')}
        />
        {myProfile?.reviews.length > 0 ? (
          <ReviewArea reviews={myProfile?.reviews} />
        ) : (
          <NoneReview />
        )}
      </div>

      <div className="-mx-4 h-2 bg-[var(--gray-1)]"></div>
    </>
  );
};

export const GuestMyPage = () => {
  return (
    <>
      <div className="rounded-2xl bg-[var(--gray-1)] py-6">
        <p className="text-center text-lg font-semibold text-[var(--gray-8)]">
          네이버로 로그인하고
        </p>
        <p className="text-center text-lg font-semibold text-[var(--gray-8)]">
          코르크차지 이용하기
        </p>
        <div
          className="mx-auto mt-3 flex h-[54px] w-[60%] cursor-pointer items-center justify-center gap-4 rounded bg-[#03C75A] text-white"
          onClick={NaverLogIn}
        >
          <img src={naver} className="size-4" />
          <span className="text-lg font-medium">네이버 로그인</span>
        </div>
      </div>
    </>
  );
};
