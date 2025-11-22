import { useState } from 'react';
import New from './plus.svg';
import ToggleSwitch from './ToggleSwitch';
import MyGroup from './MyGroup';
import EditGroup from './EditGroup';
import ConfirmationModal from './ConfirmationModal';
import { AnimatePresence } from 'framer-motion';

// 그룹 데이터의 타입 정의
type Group = {
  id: number;
  name: string;
  iconName: string;
  count: number;
  privacy: 'public' | 'private';
};

const List = () => {
  // 'list' (목록 뷰) | 'edit' (편집 뷰)
  const [view, setView] = useState<'list' | 'edit'>('list');
  // 저장된 그룹 목록
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  // 편집이 완료되었을 때 뜰 확인 모달
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 방금 편집/생성한 그룹 정보 (모달에 띄울 용도)
  const [confirmedGroup, setConfirmedGroup] = useState<Group | null>(null);

  // "새 리스트 만들기" 클릭 시
  const handleCreateNew = () => {
    setView('edit');
  };

  // "그룹 편집" 화면에서 "완료" 클릭 시
  const handleSaveGroup = (data: Omit<Group, 'id' | 'count'>) => {
    const newGroup: Group = {
      ...data,
      id: Date.now(), // 임시로 고유 ID 생성
      count: 0, // 새 그룹은 항상 0개
    };

    setMyGroups((prev) => [newGroup, ...prev]); // 새 그룹을 목록 맨 위에 추가
    setConfirmedGroup(newGroup); // 모달에 띄울 그룹 정보 저장
    setView('list'); // 뷰를 리스트로 전환
    setShowConfirmModal(true); // 확인 모달 띄우기
  };

  // "그룹 편집" 화면에서 "X" 클릭 시
  const handleCancelEdit = () => {
    setView('list');
  };

  // 확인 모달 닫기
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmedGroup(null);
  };

  return (
    <div className="relative h-full w-full">
      {/* 1. 리스트 뷰 */}
      {view === 'list' && (
        <div className="flex h-full w-full flex-col pt-2">
          {/* 헤더: 저장한 매장 + 드롭다운 */}
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-[20px] font-bold text-[#35353F]">저장한 매장</h1>
            {/* 토글 스위치 */}
            <div className="flex h-8 cursor-pointer items-center gap-2 rounded-[20px] py-1">
              <span className="text-[16px] font-[400] text-[#80818B]">콜키지 정보 on/off</span>
              <ToggleSwitch />
            </div>
          </div>

          {/* 새 리스트 만들기 */}
          <div
            onClick={handleCreateNew}
            className="mt-4 flex cursor-pointer items-center gap-[12px] border-b border-[#DBDDE1] pb-4"
          >
            <img src={New} alt="New" />
            <span className="text-[14px] font-[500] text-[#C5C8CF]">새 그룹 만들기</span>
          </div>

          {/* 저장된 그룹 목록 (스크롤 영역) */}
          <div className="flex-1 overflow-y-auto">
            {myGroups.map((group) => (
              <MyGroup
                key={group.id}
                iconName={group.iconName}
                name={group.name}
                count={group.count}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. 그룹 편집 뷰 */}
      {view === 'edit' && <EditGroup onSave={handleSaveGroup} onCancel={handleCancelEdit} />}

      {/* 3. 확인 모달 (AnimatePresence로 애니메이션) */}
      <AnimatePresence>
        {showConfirmModal && confirmedGroup && (
          <ConfirmationModal
            groupName={confirmedGroup.name}
            iconName={confirmedGroup.iconName}
            onClose={handleCloseConfirmModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default List;
