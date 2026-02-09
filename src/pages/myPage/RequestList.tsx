import Header from '@/shared/components/common/Header';
import { useGetRequestLists } from '@/shared/queries/useMyRequestLists';

import arrow from '@/shared/assets/right_arrow.svg';

function RequestList() {
  const { data: reqList } = useGetRequestLists();

  const renderRequests = () =>
    [...new Array(5)].map((req, idx) => (
      <div className="relative cursor-pointer border-b border-[var(--gray-3)] p-4">
        <div className="flex flex-col font-medium">
          <span className="text-[var(--gray-8)]">깍둑 - 건대점</span>
          <span className="text-[10px] text-[var(--gray-4)]">2025년 05월 17일</span>
        </div>
        <img src={arrow} className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    ));

  return (
    <div className="px-4">
      <Header title="해주세요 목록" type="back" />

      <div className="mx-3">{renderRequests()}</div>
    </div>
  );
}

export default RequestList;
