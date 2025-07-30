import { useState } from 'react';
import Header from '@/shared/components/filter/Header';
import TopButtonContainer from '@/shared/components/filter/TopButtonContainer';
import Category from '../../shared/components/filter/Category';
import CorkageStore from '../../shared/components/filter/CorkageStore';
import Price from '../../shared/components/filter/Price';
import PricePerBottle from '@/shared/components/filter/PricePerBottle';
import PricePerPerson from '@/shared/components/filter/PricePerPerson';
import PricePerTable from '@/shared/components/filter/PricePerTable';
import Others from '@/shared/components/filter/Others';
import BottomButtonContainer from '@/shared/components/filter/BottomButtonContainer';
import RegionFilter from '@/shared/components/filter/RegionFilter';

const Filter = () => {
  const [selectedTab, setSelectedTab] = useState<'corkage' | 'region'>('corkage');
  return (
    <main className="relative flex h-screen flex-col items-center">
      <Header />
      <TopButtonContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === 'corkage' ? (
        <>
          {/*스크롤 가능한 필터 내용 영역 시작 */}
          <div className="w-full flex-1 overflow-y-auto pb-[120px]">
            <Category />
            <CorkageStore />
            <Price />
            <PricePerBottle />
            <PricePerPerson />
            <PricePerTable />
            <Others />
          </div>
          <div
            className="pointer-events-none absolute bottom-0 h-[20.3vh] w-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 4%, #FFF 63.5%)',
            }}
          ></div>
        </>
      ) : (
        <RegionFilter />
      )}
      <BottomButtonContainer />
    </main>
  );
};

export default Filter;
