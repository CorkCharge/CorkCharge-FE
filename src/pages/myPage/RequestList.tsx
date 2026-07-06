import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import { useGetRequestLists } from '@/shared/queries/user/useMyRequestLists';

import arrow from '@/shared/assets/right_arrow.svg';

function RequestList() {
  const navigate = useNavigate();

  const { data: reqList } = useGetRequestLists();

  const renderRequests = () =>
    reqList?.map((req) => (
      <div
        key={req.helprequestId}
        className="relative cursor-pointer border-b border-[var(--gray-3)] p-4"
        onClick={() =>
          navigate(`/my/request/${req.helprequestId}`, {
            state: { restaurantName: 'rn', restaurantId: 5 },
          })
        }
      >
        <div className="flex flex-col font-medium" style={{ maxWidth: 'calc(100% - 20px)' }}>
          <span className="truncate text-[var(--gray-8)]">{req.restaurantName}</span>
          <span className="text-[10px] text-[var(--gray-4)]">
            {new Date(req.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <img src={arrow} className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    ));

  return (
    <div className="px-4">
      <Header title="해주세요 목록" type="back" backFn={() => navigate('/my')} />

      <div className="mx-3">{renderRequests()}</div>
    </div>
  );
}

export default RequestList;
