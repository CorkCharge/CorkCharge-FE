import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import New from './plus.svg';
import ToggleSwitch from './ToggleSwitch';
import MyGroup from './MyGroup';
import EditGroup from './EditGroup';
import ConfirmationModal from './ConfirmationModal';
import { AnimatePresence } from 'framer-motion';
import {
  createBookmarkGroup,
  updateBookmarkGroup,
  deleteBookmarkGroup,
} from '@/shared/apis/bookmark/bookmark.api';
import { mapIconToColor } from '@/shared/utils/groupMapper';

// 그룹 데이터의 타입 정의
export type Group = {
  id: number;
  name: string;
  iconName: string;
  count: number;
  privacy: 'public' | 'private';
};

type ListProps = {
  myGroups: Group[]; // 부모가 주는 데이터
  setMyGroups: Dispatch<SetStateAction<Group[]>>; // 부모가 주는 수정 함수
  onSelectGroup: (group: Group) => void; // 그룹 선택 시 부모에게 알림
  refreshGroups: () => Promise<void>;
};

const List = ({ myGroups, setMyGroups, onSelectGroup, refreshGroups }: ListProps) => {
  // 'list' (목록 뷰) | 'edit' (편집 뷰)
  const [view, setView] = useState<'list' | 'edit'>('list');
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
  const handleDeleteGroup = async (id: number) => {
    const targetGroup = myGroups.find((g) => g.id === id);
    if (!targetGroup) return;

    try {
      // [API] 그룹 삭제
      await deleteBookmarkGroup(id);
      // [낙관적 업데이트] UI에서 즉시 제거

      setConfirmedGroup(targetGroup);
      setModalMode('delete');
      setShowConfirmModal(true);
      await refreshGroups(); // 목록 새로고침
    } catch (error) {
      console.error('그룹 삭제 실패', error);
      setMyGroups((prev) => [...prev, targetGroup]);
      alert('그룹 삭제에 실패했습니다.');
    }
  };

  // 4. EditGroup 화면에서 "완료" 클릭 시 (생성 또는 수정 저장)
  const handleSaveGroup = async (data: Omit<Group, 'id' | 'count'>) => {
    const apiData = {
      name: data.name,
      color: mapIconToColor(data.iconName), // SaveMarker1 -> COLOR_01
      visibility: data.privacy === 'public' ? 'PUBLIC' : ('PRIVATE' as 'PUBLIC' | 'PRIVATE'),
    };

    try {
      if (editingGroupId) {
        setMyGroups((prev) =>
          prev.map((group) => (group.id === editingGroupId ? { ...group, ...data } : group))
        );

        await updateBookmarkGroup(editingGroupId, apiData);

        // 모달용 데이터 세팅
        const updatedGroup = myGroups.find((g) => g.id === editingGroupId);
        if (updatedGroup) {
          setConfirmedGroup({ ...updatedGroup, ...data });
          setModalMode('edit');
        }
      } else {
        // [API] 생성
        await createBookmarkGroup(apiData);

        // 생성된 그룹은 ID를 서버에서 받지만, 여기선 모달 표기용 임시 객체 생성
        setConfirmedGroup({ ...data, id: 0, count: 0 });
        setModalMode('create');
      }

      // 뷰 복귀 및 새로고침
      setView('list');
      setShowConfirmModal(true);
      setEditingGroupId(null);
      await refreshGroups(); // 목록 새로고침 (중요)
    } catch (error) {
      console.error('그룹 저장/수정 실패', error);
      alert('그룹 저장에 실패했습니다.');
    }
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
                onClick={() => onSelectGroup(group)} // [추가] 클릭 시 부모에게 해당 그룹 전달
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
