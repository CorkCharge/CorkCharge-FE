import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';
import BottomSheet from '@/shared/components/bottomsheet/BottomSheet';
import save from './save.svg';
import bttn from './filterImg.svg';
import List from './list/List';
import BackArrow from '../../shared/assets/backarrow.svg';
import X from './list/X.svg';
import type { Group } from './list/List';
import MyStore from './mystore/MyStore';
import MultipinList from './multipinlist/MultipinList';

const CorkageMap = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedClusterIds, setSelectedClusterIds] = useState<number[]>([]);

  // 선택된 클러스터 지역명을 저장할 State
  const [selectedAreaName, setSelectedAreaName] = useState<string>('');

  //바텀시트 내부 뷰 상태: 'list' | 'store' 'multipin' 상태 추가 (클러스터 마커 클릭 시 보여줄 화면)
  const [sheetView, setSheetView] = useState<'list' | 'store' | 'multipin'>('list');

  // 선택된 그룹 정보 (MyStore에 전달하거나 나중에 사용)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // List에 있던 상태를 부모인 여기로 끌어올림 (State Lifting)
  // 이 컴포넌트는 바텀시트가 닫혀도 계속 살아있으므로 데이터가 유지됨
  const [myGroups, setMyGroups] = useState<Group[]>([]);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setIsActive(false); // <-- 버튼 활성화 상태도 함께 false로 변경
    // [Option] 닫으면 다시 목록으로 초기화할지 여부.
    // 보통 닫았다 다시 열면 목록이 뜨는게 자연스러우므로 초기화 추천ㅇㅇ
    setTimeout(() => setSheetView('list'), 300);
  };

  // List에서 그룹 클릭 시 호출될 함수
  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group); // 선택된 그룹 저장
    setSheetView('store'); // 뷰를 상세(MyStore)로 변경
  };

  // NaverMap에서 클러스터 마커 클릭 시 호출될 함수
  const handleClusterClick = (name: string, ids: number[]) => {
    setSelectedAreaName(name); // 지역명 저장
    setSelectedClusterIds(ids);
    // 1. 바텀시트 뷰를 멀티핀 리스트로 변경
    setSheetView('multipin');
    // 2. 바텀시트 열기
    setIsSheetOpen(true);
    // 3. (옵션) 하단 '저장한 매장' 버튼 활성화 여부는 기획에 따라 결정 (여기선 false 유지 or true)
    // setIsActive(true);
  };

  const headerHeightPx = 96;
  const headerVh =
    typeof window !== 'undefined' ? (headerHeightPx / window.innerHeight) * 100 : 11.5;
  // MyStore 뷰일 때 topSnapVh는 19.8, List일 땐 17.8, 근데 이게 처음에 BottomSheet가 마운트될때 이미 17.8로 마운트되서 바뀌질 않음
  const currentTopSnapVh = sheetView === 'multipin' ? headerVh : 17.8;
  // [편의용] 멀티핀 뷰인지 확인하는 변수
  const isMultipinView = sheetView === 'multipin';

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 지도: 화면 전체 덮기 */}
      <div className="absolute inset-0 z-0">
        <NaverMap onClusterClick={handleClusterClick} />
      </div>

      {/* 멀티핀 뷰가 아닐 때만 보여줌  (TopBarMap + 필터/저장 버튼) */}
      {!isMultipinView && (
        <>
          {/* 상단 검색바 */}
          <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-2">
            <TopBarMap searchDisabled={false} />
          </div>

          {/* 검색바 아래 버튼 2개 */}
          <div className="absolute left-0 right-0 top-[72px] z-20 flex gap-2 px-4">
            <button
              onClick={() => navigate('filter')}
              className="flex h-[36px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/90 shadow-sm backdrop-blur-sm"
            >
              <img src={bttn} alt="필터링버튼" className="h-[14px] w-[18px]" />
              <p className="text-[14px] font-medium text-[#90212A]">
                원하는 콜키지 매장을 찾아봐요!
              </p>
            </button>

            <button
              onClick={() => {
                setIsSheetOpen(true);
                setIsActive(true);
              }}
              className={`flex h-[36px] flex-[0.6] cursor-pointer items-center justify-center gap-2 rounded-full ${isActive ? 'bg-[#90212A] text-[#FFF]' : 'bg-white/90 text-[#90212A]'} shadow-sm backdrop-blur-sm`}
            >
              <img src={save} alt="저장표시" className="h-[14px] w-[16px]" />
              <p className="text-[14px] font-medium">저장한 매장</p>
            </button>
          </div>
        </>
      )}

      {/* 지역명 표시 상단바 */}
      {isMultipinView && (
        <div className="absolute top-0 z-[102] h-[96px] w-full bg-white pt-[4px]">
          <div className="flex flex-row place-content-between items-center px-[18px] pt-[48px]">
            <div className="flex flex-row gap-[13px]">
              <img
                src={BackArrow}
                alt="뒤로가기"
                className="cursor-pointer"
                onClick={handleSheetClose}
              />
              <span className="color-[#35353F] text-[16px] font-[500]">{selectedAreaName}</span>
            </div>
            <img src={X} alt="X" className="cursor-pointer" onClick={handleSheetClose} />
          </div>
        </div>
      )}

      {/* 바텀시트: 저장한 매장 or 멀티핀 리스트 */}
      <BottomSheet isOpen={isSheetOpen} onClose={handleSheetClose} topSnapVh={currentTopSnapVh}>
        {sheetView === 'list' && (
          <List myGroups={myGroups} setMyGroups={setMyGroups} onSelectGroup={handleGroupSelect} />
        )}
        {sheetView === 'store' && <MyStore group={selectedGroup} />}
        {sheetView === 'multipin' && <MultipinList restaurantIds={selectedClusterIds} />}
      </BottomSheet>
    </main>
  );
};

export default CorkageMap;
