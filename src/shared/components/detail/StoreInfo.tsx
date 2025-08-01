// import React from 'react'
import { useState } from 'react';
import line2 from '../../assets/detailPageImgs/line2.svg';
import address from '../../assets/detailPageImgs/address.svg';
import downarrow from '../../assets/detailPageImgs/downarrow.svg';
import uparrow from '../../assets/detailPageImgs/uparrow.svg';
import clock from '../../assets/detailPageImgs/clock.svg';
import load from '../../assets/detailPageImgs/load.svg';
import phone from '../../assets/detailPageImgs/phone.svg';
import store from '../../assets/detailPageImgs/store.svg';
import LocalDetail from './LocalDetail';

const StoreInfo = () => {
  const [showLocal, setShowLocal] = useState<boolean>(false);
  const [showAllHours, setShowAllHours] = useState<boolean>(false);
  const [showDirections, setShowDirections] = useState<boolean>(false);
  return (
    <div>
      <div className="h-[700px] p-4 text-[16px]">
        {/* 주소 */}
        <div className="flex gap-2 border border-x-0 border-t-0 pb-2">
          <img src={address} className="flex h-[24px] w-[24px] pt-1" />
          <div className="relative">
            <div className="flex flex-col">
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setShowLocal(!showLocal)}
              >
                <span>서울 광진구 아차산로49길 12 1층</span>
                <span className="relative ml-1 mt-2">
                  {showLocal ? (
                    <>
                      <img src={uparrow} />
                    </>
                  ) : (
                    <>
                      <img src={downarrow} />
                    </>
                  )}
                </span>
              </div>
              {showLocal && (
                <div className="absolute left-0 top-8 z-50">
                  <LocalDetail showLocal={showLocal} setShowLocal={setShowLocal} />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <img src={line2} className="h-[24px] w-[16px]" />
              <div>구의역 1번 출구에서 89m</div>
            </div>
          </div>
        </div>

        {/* 영업시간 */}
        <div className="border border-x-0 border-t-0 pb-2 pt-2">
          <div className="flex gap-2">
            <img src={clock} className="flex h-[20px] w-[22px] pl-1 pt-1" />
            <div className="flex flex-col">
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setShowAllHours(!showAllHours)}
              >
                <span>월 11:30 - 22:00</span>
                <span className="text-xs text-gray-400">
                  {showAllHours ? <img src={uparrow} /> : <img src={downarrow} />}
                </span>
              </div>
              {showAllHours && (
                <ul className="items-center">
                  <li>화 11:30 - 22:00</li>
                  <li>수 11:30 - 22:00</li>
                  <li>목 11:30 - 22:00</li>
                  <li>금 11:30 - 22:00</li>
                  <li>토 11:30 - 22:00</li>
                  <li>일 11:30 - 22:00</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 길정보 */}
        <div className="flex gap-2 border border-x-0 border-t-0 pb-2 pt-2">
          <img src={load} className="flex h-[24px] w-[22px] pl-1 pt-1" />
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setShowDirections(!showDirections)}
          >
            {showDirections ? (
              <>
                <div className="relative w-[310px]">
                  <p className="inline">
                    구의역 1번출구에서 나와서 버스정류장 지나자마자 오른쪽에 나오는 골목으로
                    들어오시면 있습니다 미가로 정문쪽에서 들어오시는 분들은 80m정도 쭉 들어오시다가
                    오른쪽 CU편의점 옆 골목으로 들어오시면 골목 안에 주황색 가게가 있습니다!
                    <img src={uparrow} className="mb-[6px] ml-2 inline align-text-bottom" />
                  </p>
                </div>
              </>
            ) : (
              <>
                <span>구의역 1번출구에서 나와서 버스정류장 지나...</span>
                <img src={downarrow} />
              </>
            )}
          </div>
        </div>

        {/* 전화번호 */}
        <div className="flex gap-2 border border-x-0 border-t-0 pb-2 pt-2">
          <img src={phone} className="flex h-[20px] w-[18px] pl-1 pt-1" />
          <span>0507-1111-1112</span>
        </div>

        {/* 기타정보 */}
        <div className="flex gap-2 border border-x-0 border-t-0 pb-2 pt-2">
          <img src={store} className="flex h-[20px] w-[18px] pl-1 pt-1" />
          <div>포장, 배달, 무선 인터넷, 예약</div>
        </div>
      </div>
    </div>
  );
};
export default StoreInfo;
