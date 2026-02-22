import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/shared/store/useAuthStore';
import apiClient from '@/shared/apis/apiClient';
import type { Review } from '@/shared/types/mypage';
import { NaverLogIn } from '@/shared/apis/signIn/Naver';
import { ControlLists, ControlItem } from './ControlList';

import logo from '@/shared/components/myPage/images/small-logo.png';
import arrow from '@/shared/assets/images/arrow.png';
import plus from '@/shared/assets/images/plus.png';
import naver from '@/shared/components/myPage/images/naver-white.png';
import { useGetMypageInfo } from '@/shared/queries/user/useMyPage';
import DefaultImage from '../common/DefaultImage';

const renderReviews = (reviews: Review[]) =>
  reviews.map((review, idx) =>
    review.thumbnailUrl ? (
      <div
        key={idx}
        className="flex h-[168px] w-[30%] flex-none flex-col justify-end rounded-lg p-3 text-white"
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
    ) : (
      <div key={idx} className="relative h-[168px] w-[30%] shrink-0">
        <DefaultImage
          hasLogo={true}
          containerClassName="rounded-lg"
          className="rounded-lg"
          logoHeight="50%"
        />
        <div className="absolute inset-x-3 bottom-3 flex flex-col">
          <span className="text-[10px] font-medium">{review.location}</span>
          <span className="text-sm font-bold">{review.restaurantName}</span>
        </div>
      </div>
    )
  );

const ReviewArea = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      <div className="mt-5 flex gap-2 overflow-x-auto">{renderReviews(reviews)}</div>
    </>
  );
};

const NoneReview = () => {
  return (
    <section className="mt-5 text-[var(--gray-8)]">
      <p>코르크 차지에</p>
      <p>아직 아무도 남기지 않았어요.</p>
      <p>첫 리뷰, 지금 남겨보세요!</p>
    </section>
  );
};

// 로그인 사용자에게 보여줄 마이페이지
export const LoggedInMyPage = () => {
  const { user } = useAuthStore();
  const isMaster = user?.role === 'OWNER';

  const navigate = useNavigate();

  const { data: myProfile } = useGetMypageInfo();

  const enrollCorkage = () => {
    apiClient
      .get('/corkages/verify')
      .then((res) => {
        if (!res.data.success) throw new Error('OOPS');
        const { restaurantName, restaurantId, ...rest } = res.data.data[0];
        const stateObj = { storeName: restaurantName, restaurantId, ...rest };
        navigate(`/add/storecheck/${restaurantId}`, { state: stateObj });
      })
      .catch((e) => console.error('<권한 검증 실패> ' + e));
  };

  return (
    <>
      <div className="mx-auto mb-4 rounded-2xl bg-[var(--gray-1)] px-4 py-[21px]">
        <div className="relative flex gap-[22px]">
          <div className="flex max-w-[60%] flex-col justify-center">
            <p className="flex items-center gap-1 text-xl font-bold">
              <span>{myProfile?.nickname}님</span>
              {isMaster && <img src={logo} className="h-[21px]" />}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-[var(--gray-6)]">
              {myProfile?.email?.split('@')[0]}
            </p>
          </div>
          <img
            src={arrow}
            className="absolute right-1 top-1/2 h-4 -translate-y-1/2 cursor-pointer"
            onClick={() => navigate('/my/modify', { state: { from: 'mypage' } })}
          />
        </div>

        {isMaster && (
          <>
            <div className="-mx-4 mt-5 border-t border-[var(--gray-4)]" />

            <div
              className="flex cursor-pointer items-center gap-[22px] pl-2 pt-4"
              onClick={enrollCorkage}
            >
              <div className="flex size-[30px] items-center justify-center rounded-[50%] bg-[var(--gray-4)]">
                <img src={plus} className="size-[14px]" />
              </div>
              <p className="font-bold">콜키지 정보 등록하기</p>
            </div>

            <div className="-mx-4 mt-5 border-t border-[var(--gray-4)]" />
            <div
              className="flex cursor-pointer items-center gap-[22px] pl-2 pt-4"
              onClick={() => navigate('/add/my-stores')}
            >
              <div className="flex size-[30px] items-center justify-center rounded-[50%] bg-[var(--primary)]">
                <svg
                  className="ml-[2.5px]"
                  width="16"
                  height="22"
                  viewBox="0 0 16 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1685 0C13.2901 2.12174 13.2901 5.56717 11.1685 7.68891L3.84422 15.0135C1.72258 12.8917 1.72258 9.44632 3.84422 7.32458L11.1685 0Z"
                    fill="white"
                  />
                  <path
                    d="M9.67725 10.9858C11.2337 12.5424 11.2337 15.0698 9.67725 16.6264L4.30391 21.9999C2.74745 20.4434 2.74745 17.916 4.30391 16.3594L9.67725 10.9858Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="font-bold">내 가게 확인하기</p>
            </div>
          </>
        )}
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

      <ControlLists>
        <ControlItem onClick={() => navigate('/my/request-list')}>해주세요 목록</ControlItem>
        <ControlItem onClick={() => navigate('/my/toc')}>약관 및 개인정보 처리방침</ControlItem>
        <ControlItem onClick={() => navigate('/my/contact')}>문의하기</ControlItem>
      </ControlLists>
    </>
  );
};

// 로그인 하지 않은 사용자에게 보여줄 페이지
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
