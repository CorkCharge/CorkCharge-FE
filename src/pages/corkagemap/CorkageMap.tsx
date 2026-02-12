import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarkGroups, createBookmark } from '@/shared/apis/bookmark/bookmark.api';
import { mapColorToIcon } from '@/shared/utils/groupMapper';
import type { Group } from './list/List';
import NaverMap from '@/shared/components/navermap/NaverMap';
import TopBarMap from '@/shared/components/topbar/TopBarMap';
import BottomSheet from '@/shared/components/bottomsheet/BottomSheet';
import save from './save.svg';
import bttn from './filterImg.svg';
import List from './list/List';
import BackArrow from '../../shared/assets/backarrow.svg';
import X from './list/X.svg';
import MyStore from './mystore/MyStore';
import MultipinList from './multipinlist/MultipinList';
import Detail from './restaurant_detail/Detail';

const CorkageMap = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedClusterIds, setSelectedClusterIds] = useState<number[]>([]);
  const [isSaveMode, setIsSaveMode] = useState(false);

  // 1. 그룹 리스트 불러오기 (초기 로딩 및 갱신용)
  const fetchGroups = useCallback(async () => {
    try {
      const res = await getBookmarkGroups();
      if (res.success) {
        // API 데이터 -> Group 타입 변환
        const mappedGroups: Group[] = res.data.groups.map((g) => ({
          id: g.groupId,
          name: g.name,
          iconName: mapColorToIcon(g.color), // COLOR_01 -> SaveMarker1
          count: g.storeCount,
          privacy: g.visibility === 'PUBLIC' ? 'public' : 'private',
        }));
        setMyGroups(mappedGroups);
      }
    } catch (e) {
      console.error('그룹 목록 로드 실패', e);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // 선택된 클러스터 지역명을 저장할 State
  const [selectedAreaName, setSelectedAreaName] = useState<string>('');

  //바텀시트 내부 뷰 상태: 'list' | 'store' 'multipin' 상태 추가 (클러스터 마커 클릭 시 보여줄 화면)
  const [sheetView, setSheetView] = useState<'list' | 'store' | 'multipin' | 'detail'>('list');

  // [추가] 선택된 개별 식당 ID 저장
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  // 선택된 그룹 정보 (MyStore에 전달하거나 나중에 사용)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // List에 있던 상태를 부모인 여기로 끌어올림 (State Lifting)
  // 이 컴포넌트는 바텀시트가 닫혀도 계속 살아있으므로 데이터가 유지됨
  const [myGroups, setMyGroups] = useState<Group[]>([]);

  // 바텀시트 닫힐 때 초기화
  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setIsActive(false);
    setTimeout(() => {
      setSheetView('list');
      setSelectedRestaurantId(null);
      setIsSaveMode(false); // 저장 모드 초기화
    }, 300);
  };

  // [추가] NaverMap에서 개별 식당 마커 클릭 시 호출될 함수
  const handleRestaurantClick = useCallback((restaurantId: number) => {
    setSelectedRestaurantId(restaurantId);
    setSheetView('detail');
    setIsSheetOpen(true);
  }, []);

  // List에서 그룹 클릭 시 호출될 함수
  const handleGroupSelect = async (group: Group) => {
    console.log(
      '[CorkageMap] 그룹 선택됨:',
      group.name,
      '현재 모드:',
      isSaveMode ? '저장' : '조회'
    );
    if (isSaveMode && selectedRestaurantId) {
      // [저장 모드] : 해당 그룹에 식당 저장 API 호출
      console.log('👉 [CorkageMap] 저장 API 호출 시작...');
      try {
        const res = await createBookmark({
          targetId: selectedRestaurantId,
          targetType: 'RESTAURANT',
          groupIds: [group.id],
        });

        if (res.success) {
          alert(`'${group.name}' 그룹에 저장되었습니다.`);
          setIsSaveMode(false); // 모드 해제
          setSheetView('detail'); // 다시 상세 화면으로 복귀
          fetchGroups(); // 그룹 카운트가 변했을 테니 갱신
        }
      } catch (e) {
        console.error('식당 저장 실패', e);
        alert('저장에 실패했습니다.');
      }
    } else {
      // [조회 모드] : MyStore(그룹 상세) 화면으로 이동
      console.log('👉 [CorkageMap] 상세 조회 화면으로 이동');
      setSelectedGroup(group);
      setSheetView('store');
    }
  };

  // NaverMap에서 클러스터 마커 클릭 시 호출될 함수
  const handleClusterClick = useCallback((name: string, ids: number[]) => {
    setSelectedAreaName(name);
    setSelectedClusterIds(ids);
    setSheetView('multipin');
    setIsSheetOpen(true);
  }, []);

  const headerHeightPx = 96;
  const headerVh =
    typeof window !== 'undefined' ? (headerHeightPx / window.innerHeight) * 100 : 11.5;
  // MyStore 뷰일 때 topSnapVh는 19.8, List일 땐 17.8, 근데 이게 처음에 BottomSheet가 마운트될때 이미 17.8로 마운트되서 바뀌질 않음
  const currentTopSnapVh =
    sheetView === 'detail'
      ? 0 // 화면 상단 5% 정도만 남기고 다 올림 (원하는 만큼 조절)
      : sheetView === 'multipin'
        ? headerVh
        : 17.8;
  // [편의용] 멀티핀 뷰인지 확인하는 변수
  const isMultipinView = sheetView === 'multipin';

  const handleSnapToTop = () => {
    // Detail 뷰일 때만 페이지 이동
    if (sheetView === 'detail' && selectedRestaurantId) {
      // 약간의 지연을 주어 애니메이션이 끝난 후 이동하게 하면 더 자연스러울 수 있음
      setTimeout(() => {
        navigate(`/detail-info/${selectedRestaurantId}`);
      }, 300);
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 지도: 화면 전체 덮기 */}
      <div className="absolute inset-0 z-0">
        <NaverMap onClusterClick={handleClusterClick} onRestaurantClick={handleRestaurantClick} />
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
                setIsSaveMode(false); // 조회 모드
                setIsSheetOpen(true);
                setIsActive(true);
                setSheetView('list');
                fetchGroups();
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
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        topSnapVh={currentTopSnapVh}
        hideHandleOnTop={isMultipinView}
        onSnapToTop={handleSnapToTop}
      >
        {sheetView === 'list' && (
          <List
            myGroups={myGroups}
            setMyGroups={setMyGroups}
            onSelectGroup={handleGroupSelect}
            refreshGroups={fetchGroups}
          />
        )}
        {sheetView === 'store' && <MyStore group={selectedGroup} />}
        {sheetView === 'multipin' && <MultipinList restaurantIds={selectedClusterIds} />}
        {/* [추가] Detail 컴포넌트 렌더링 (ID 전달) */}
        {sheetView === 'detail' && selectedRestaurantId && (
          <Detail restaurantId={selectedRestaurantId} />
        )}
      </BottomSheet>
    </main>
  );
};

export default CorkageMap;
