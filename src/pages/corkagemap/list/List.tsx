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
  // 현재 편집 중인 그룹의 ID (null이면 새 그룹 생성 모드)
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);

  // 편집이 완료되었을 때 뜰 확인 모달
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 방금 편집/생성한 그룹 정보 (모달에 띄울 용도)
  const [confirmedGroup, setConfirmedGroup] = useState<Group | null>(null);
  // 모달 모드: 'create' | 'edit' | 'delete'
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');

  // "새 그룹 만들기" 클릭 시
  const handleCreateNew = () => {
    setEditingGroupId(null); // ID가 없으면 생성 모드
    setView('edit');
  };

  // 2. 개별 그룹 "편집하기" 클릭 시 (MyGroup에서 호출)
  const handleEditGroup = (id: number) => {
    setEditingGroupId(id); // ID 설정 -> 편집 모드
    setView('edit');
  };

  // 3. 개별 그룹 "삭제하기" 클릭 시 (MyGroup에서 호출)
  const handleDeleteGroup = (id: number) => {
    const targetGroup = myGroups.find((g) => g.id === id);
    if (targetGroup) {
      // 목록에서 제거
      setMyGroups((prev) => prev.filter((g) => g.id !== id));

      // 모달 띄우기 (삭제 모드)
      setConfirmedGroup(targetGroup);
      setModalMode('delete');
      setShowConfirmModal(true);
    }
  };

  // 4. EditGroup 화면에서 "완료" 클릭 시 (생성 또는 수정 저장)
  const handleSaveGroup = (data: Omit<Group, 'id' | 'count'>) => {
    if (editingGroupId) {
      // [수정 모드] 기존 그룹 업데이트
      setMyGroups((prev) =>
        prev.map((group) =>
          group.id === editingGroupId
            ? { ...group, ...data } // 기존 데이터 덮어쓰기
            : group
        )
      );

      // 수정 완료된 그룹 찾아서 모달 데이터 설정
      const updatedGroup = myGroups.find((g) => g.id === editingGroupId);
      // (주의: state 업데이트는 비동기이므로 여기서 바로 updatedGroup을 쓰면 이전 값이 나올 수 있음.
      //  하지만 data에 최신 값이 있으므로 data와 병합하여 사용)
      const newGroupInfo = { ...updatedGroup, ...data } as Group;

      setConfirmedGroup(newGroupInfo);
      setModalMode('edit');
    } else {
      // [생성 모드] 새 그룹 추가
      const newGroup: Group = {
        ...data,
        id: Date.now(),
        count: 0,
      };
      setMyGroups((prev) => [newGroup, ...prev]); // 맨 위에 추가
      setConfirmedGroup(newGroup);
      setModalMode('create');
    }

    setView('list');
    setShowConfirmModal(true);
    setEditingGroupId(null); // 초기화
  };

  // "그룹 편집" 화면에서 "X" 클릭 시
  const handleCancelEdit = () => {
    setView('list');
    setEditingGroupId(null);
  };

  // 확인 모달 닫기
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmedGroup(null);
  };

  // 현재 편집 중인 그룹 데이터 찾기 (EditGroup에 넘겨주기 위함)
  const editingGroupData = editingGroupId ? myGroups.find((g) => g.id === editingGroupId) : null;

  return (
    <div className="relative h-full w-full">
      {/* 1. 리스트 뷰 */}
      {view === 'list' && (
        <div className="flex h-full w-full flex-col pt-2">
          {/* 헤더 */}
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-[20px] font-bold text-[#35353F]">저장한 매장</h1>
            <div className="flex h-8 cursor-pointer items-center gap-2 rounded-[20px] py-1">
              <span className="text-[16px] font-[400] text-[#80818B]">콜키지 정보 on/off</span>
              <ToggleSwitch />
            </div>
          </div>

          {/* 새 그룹 만들기 */}
          <div
            onClick={handleCreateNew}
            className="mt-4 flex cursor-pointer items-center gap-[12px] border-b border-[#DBDDE1] pb-4"
          >
            <img src={New} alt="New" />
            <span className="text-[14px] font-[500] text-[#C5C8CF]">새 그룹 만들기</span>
          </div>

          {/* 저장된 그룹 목록 */}
          <div className="flex-1 overflow-y-auto">
            {myGroups.map((group) => (
              <MyGroup
                key={group.id}
                id={group.id}
                iconName={group.iconName}
                name={group.name}
                count={group.count}
                onEdit={handleEditGroup} // 편집 핸들러 전달
                onDelete={handleDeleteGroup} // 삭제 핸들러 전달
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. 그룹 편집 뷰 (생성/수정 공용) */}
      {view === 'edit' && (
        <EditGroup
          initialData={editingGroupData} // 편집 시 기존 데이터 전달
          onSave={handleSaveGroup}
          onCancel={handleCancelEdit}
        />
      )}

      {/* 3. 확인 모달 */}
      <AnimatePresence>
        {showConfirmModal && confirmedGroup && (
          <ConfirmationModal
            groupName={confirmedGroup.name}
            iconName={confirmedGroup.iconName}
            mode={modalMode} // create | edit | delete 전달
            onClose={handleCloseConfirmModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default List;
