import Share from '@/shared/icons/Share';
import Bookmark from '@/shared/icons/Bookmark';

import star from '@/shared/assets/star.svg';

const MyStoreItem = () => {
  const renderImages = () =>
    [...Array(2)].map(() => (
      <img
        src={
          'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/fYj-uNmMtTZQZvPOGLjRV9-7he8.jpg'
        }
        className="aspect-square size-[25%] rounded-lg"
      />
    ));

  return (
    <div className="relative flex flex-col gap-1">
      <h3 className="px-4 text-xl font-bold text-[var(--gray-8)]">엔비햄버거</h3>

      <div className="absolute right-4 top-0 flex gap-1">
        <Bookmark />
        <Share />
      </div>

      <div className="flex items-center gap-1 px-4">
        <img src={star} />
        <span className="font-medium text-[var(--gray-8)]">4.2</span>
        <span className="text-sm font-medium text-[var(--gray-5)]">(333)</span>
        <span className="text-sm font-semibold">영업중</span>
        <span className="text-sm font-medium text-[var(--gray-6)]">4:00 영업종료</span>
      </div>

      <div className="flex gap-1 overflow-y-auto px-4">{renderImages()}</div>

      <div className="mt-1 rounded-2xl bg-[var(--gray-1)] px-4 py-2">
        <div className="grid grid-cols-[60px_8fr] text-nowrap border-b pb-1">
          <span className="inline-block max-w-[40px] font-bold">비용</span>
          <span className="inline-block">병당 1만원</span>
        </div>
        <div className="grid grid-cols-[60px_8fr] pt-1">
          <span className="inline-block text-nowrap font-bold">기타</span>
          <span className="inline-block truncate">
            잔 제공, 얼음 제공, 리뷰이벤트: 한병 무료 등 자유롭게 입력
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyStoreItem;
