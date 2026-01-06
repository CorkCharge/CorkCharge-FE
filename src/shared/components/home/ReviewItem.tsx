import DefaultImage from '../common/DefaultImage';
import { StarRate } from '../common/StarRate';

import keep from '@/shared/assets/keep.svg';

function ReviewItem() {
  return (
    <div className="w-[172px] shrink-0 cursor-pointer rounded-2xl bg-[var(--gray-1)]">
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
        <div className="mt-1 flex items-center">
          <div className="mr-1 flex size-4 items-center justify-center rounded-full bg-[#e75257]">
            <img src={keep} className="h-[7px] w-[7px]" />
          </div>
          <span className="text-[9px] font-medium text-[var(--gray-8)]">99+</span>
          <div className="ml-1 flex size-4 items-center justify-center rounded-full bg-white">
            <svg
              width="9"
              height="9"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4679 21C13.0001 21 12.6626 20.8329 12.4555 20.4988C12.2483 20.1646 12.0712 19.7471 11.9242 19.2458L10.3304 13.9532C10.2368 13.6191 10.2034 13.3518 10.2301 13.1513C10.2569 12.9441 10.3672 12.737 10.5609 12.5299L20.7953 1.49355C20.8555 1.43341 20.8855 1.36659 20.8855 1.29308C20.8855 1.21957 20.8588 1.15943 20.8053 1.11265C20.7519 1.06587 20.6884 1.04248 20.6148 1.04248C20.548 1.0358 20.4846 1.06253 20.4244 1.12267L9.42823 11.3971C9.20771 11.5976 8.99387 11.7112 8.78671 11.738C8.57954 11.758 8.31559 11.7179 7.99482 11.6177L2.58193 9.97376C2.10079 9.82673 1.70317 9.653 1.38909 9.4525C1.07501 9.24533 0.917969 8.91122 0.917969 8.45009C0.917969 8.0893 1.06164 7.77852 1.349 7.5179C1.63635 7.25729 1.99052 7.04678 2.41153 6.8864L19.6526 0.280672C19.8865 0.193792 20.1037 0.126969 20.3042 0.080191C20.5113 0.0267303 20.6984 0 20.8655 0C21.1929 0 21.4502 0.0935561 21.6374 0.280672C21.8244 0.467784 21.918 0.725062 21.918 1.05251C21.918 1.22625 21.8912 1.41337 21.8378 1.61384C21.791 1.81432 21.7242 2.0315 21.6374 2.2654L15.0717 19.4162C14.8845 19.8974 14.6607 20.2817 14.4001 20.569C14.1394 20.8563 13.8287 21 13.4679 21Z"
                fill="none"
                stroke="var(--gray-7)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
