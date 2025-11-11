import DefaultImage from '../common/DefaultImage';
import { StarRate } from '../common/StarRate';

function ReviewItem() {
  return (
    <div className="w-[172px] shrink-0 rounded-2xl bg-[var(--gray-1)]">
      <div className="px-3 py-[10px]">
        <span className="text-sm font-bold">성수 루메르도스</span>
        <div className="flex items-center">
          <StarRate rate={4.2} spacing="3px" className="mr-1 h-[14px]" width="14" height="13" />
          <span className="text-sm font-medium text-[var(--gray-8)]">4.2</span>
        </div>
      </div>

      <DefaultImage
        hasLogo={true}
        containerClassName="h-[172px]"
        logoHeight="82px"
        logoWidth="50px"
        className="h-full"
      />

      <div className="px-[9.5px] py-2">
        <div className="flex justify-between text-[10px] font-medium">
          <span className="text-[var(--gray-8)]">니콜라 테슬라</span>
          <span>2025.01.01</span>
        </div>
        <p className="mt-1 text-xs font-medium">
          몰트향과 완벽하게 어우러지는 조화로운 페어링입니다.
        </p>
        <div></div>
      </div>
    </div>
  );
}

export default ReviewItem;
