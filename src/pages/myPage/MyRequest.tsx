import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import arrow from '@/shared/assets/whiteArrow.svg';
import { getMyRequestDetail } from '@/shared/apis/user/user.api';
import type { MyReqDetailResponse } from '@/shared/apis/user/user.type';
import type { PriorityRequest } from '@/shared/apis/helpRequest/helpRequest.type';

function MyRequest() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [myReq, setMyReq] = useState<MyReqDetailResponse>();

  useEffect(() => {
    getDetailInfo();
  }, []);

  const getDetailInfo = async () => {
    if (!id) return;

    try {
      const res = await getMyRequestDetail(Number(id));
      setMyReq(res);
    } catch (e) {
      console.error('해주세요 상세정보 가져오기 실패: ' + e);
    }
  };

  const renderPriorityButtons = (pri: PriorityRequest) => (
    <div className="flex gap-1">
      <span
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'GLASS_PROVIDED' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
      >
        잔 제공
      </span>
      <span
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'ICE_PROVIDED' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
      >
        얼음
      </span>
      <span
        className={`rounded-3xl border border-solid px-4 py-[6px] font-medium disabled:bg-[var(--gray-3)] ${pri === 'DECANTING' ? 'border-[var(--primary)] bg-[rgba(144,33,70,0.15)] text-[var(--primary)]' : 'border-[var(--gray-3)] text-[var(--gray-6)]'}`}
      >
        디캔팅
      </span>
    </div>
  );

  return (
    <div
      className="px-4 pb-10"
      style={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%), radial-gradient(215.29% 136.87% at -6.36% -7.63%, #90212A 0%, #DCDBE8 83.17%, #FFF 100%)',
        minHeight: 'calc(100svh - var(--footer-h))',
      }}
    >
      {/* 헤더 */}
      <div className="relative flex h-12 items-center justify-center text-center font-bold text-white">
        해주세요
        <img src={arrow} className="absolute left-0 cursor-pointer" onClick={() => navigate(-1)} />
      </div>

      {/* 가게명 및 날짜 */}
      <div className="mb-6 mt-3">
        <h3 className="mb-2 text-3xl font-bold text-white">깍둑 - 건대점</h3>
        <span className="text-sm font-medium text-white">2025년 5월 17일</span>
      </div>

      {/* 요청 본문 */}
      <div
        className="overflow-y-auto rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-white p-4"
        style={{ height: 'calc(100svh - 48px - 36px - 68px - 17px - var(--footer-h))' }}
      >
        <h3 className="mb-1 text-lg font-medium text-[var(--gray-8)]">요청 내용</h3>
        <div className="mb-7 mt-4 flex gap-5 font-medium text-[var(--primary)]">
          <span className="flex-1 rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] px-4 py-2 text-center">
            병당
          </span>
          <span className="flex-1 rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] px-4 py-2 text-center">
            1,000원
          </span>
        </div>

        <h3 className="mb-2 text-lg font-medium text-[var(--gray-8)]">기타 서비스 우선순위</h3>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-medium text-[var(--gray-8)]">1순위</span>
          <>{renderPriorityButtons('GLASS_PROVIDED')}</>
        </div>
        <div className="mb-7 flex items-center gap-2">
          <span className="font-medium text-[var(--gray-8)]">2순위</span>
          <>{renderPriorityButtons('DECANTING')}</>
        </div>

        <h3 className="mb-2 text-lg font-medium text-[var(--gray-8)]">추가 요청 사항</h3>
        <div className="rounded-br-3xl rounded-tl-3xl bg-[var(--gray-1)] p-4">
          <p className="min-h-[340px]">해주세요 제발제발 안해주면 가게 앞에서 일인시위 하겠음</p>
        </div>
      </div>
    </div>
  );
}

export default MyRequest;
