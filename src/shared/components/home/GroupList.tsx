import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import GroupItem from './GroupItem';
import CreateGroup from './CreateGroups';
import ConfirmationModal from '@/pages/corkagemap/list/ConfirmationModal';
import Button from '../common/Button';
import { useGetGroupList } from '@/shared/queries/bookmark/useGetGroupList';
import useBookmarkStore from '@/shared/store/useBookmarkStore';
import { createBookmark, editBookmarkGroup } from '@/shared/apis/bookmark/bookmark.api';

import newSvg from '@/pages/corkagemap/list/plus.svg';

// 그룹 데이터의 타입 정의
type Group = {
  groupId: number;
  name: string;
  color: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  storeCount: number;
  createdAt: string;
  updatedAt: string;
};

const GroupList = ({
  onClose,
  restaurantName,
  restaurantId,
}: {
  onClose: () => void;
  restaurantName: string;
  restaurantId: number;
}) => {
  // 'list' (목록 뷰) | 'edit' (편집 뷰)
  const [view, setView] = useState<'list' | 'edit'>('list');

  // 편집이 완료되었을 때 뜰 확인 모달
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 방금 편집/생성한 그룹 정보 (모달에 띄울 용도)
  const [confirmedGroup, setConfirmedGroup] = useState<Group | null>(null);
  // 모달 모드: 'create' | 'edit' | 'delete'
  const [changedIds, setChangedIds] = useState<number[]>([]); // 사용자가 선택한 id들을 저장

  const selectedStores = useBookmarkStore((state) => state.selectedStores);
  const updateSelectedStores = useBookmarkStore((state) => state.updateSelectedStores);

  const { data: myGroups } = useGetGroupList();

  const initialSelectedGroupIds = useMemo(
    () => selectedStores[restaurantId] ?? [],
    [selectedStores, restaurantId]
  );

  // 기존에 사용자가 선택한 id배열을 복제
  useEffect(() => {
    setChangedIds(initialSelectedGroupIds);
  }, [initialSelectedGroupIds]);

  // 초기 상태랑 비교해서 그룹 선택의 변화 유무
  const isChanged = () => {
    if (changedIds.length !== initialSelectedGroupIds.length) return true;

    const setIds = new Set(initialSelectedGroupIds);

    return changedIds.some((id) => !setIds.has(id));
  };

  // "새 그룹 만들기" 클릭 시
  const handleCreateNew = () => {
    setView('edit');
  };

  const handleCancelEdit = () => {
    setView('list');
  };

  // 확인 모달 닫기
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmedGroup(null);
  };

  const toggleSelect = (id: number) => {
    setChangedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSave = async () => {
    if (!restaurantId) return;

    try {
      // 매장을 처음 저장하는 경우
      if (initialSelectedGroupIds.length === 0) {
        await createBookmark({
          targetId: restaurantId,
          targetType: 'RESTAURANT',
          groupIds: changedIds,
        });
      }
      // 매장 저장 정보를 수정할 때
      else {
        await editBookmarkGroup({ restaurantId, groupIds: changedIds });
      }

      updateSelectedStores(restaurantId, changedIds);
      onClose();
    } catch (e) {
      console.error('매장 저장하기 실패: ' + e);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* 1. 리스트 뷰 */}
      {view === 'list' && (
        <div className="flex h-full w-full flex-col pt-2">
          {/* 헤더 */}
          <div className="relative flex flex-row items-center justify-center">
            <h1 className="text-xl font-bold text-[var(--gray-8)]">{restaurantName}</h1>
            <span className="absolute right-0 cursor-pointer" onClick={onClose}>
              ✕
            </span>
          </div>

          {/* 새 그룹 만들기 */}
          <div
            onClick={handleCreateNew}
            className="mt-4 flex cursor-pointer items-center gap-[12px] border-b border-[var(--gray-3)] pb-4"
          >
            <img src={newSvg} alt="New" />
            <span className="text-[14px] font-[500] text-[var(--gray-4)]">새 그룹 만들기</span>
          </div>

          {/* 저장된 그룹 목록 */}
          <div className="flex-1 overflow-y-auto">
            {myGroups?.map((group) => (
              <GroupItem
                key={group.groupId}
                id={group.groupId}
                iconName={group.color}
                name={group.name}
                count={group.storeCount}
                checked={initialSelectedGroupIds.includes(group.groupId)}
                onSelect={(id) => toggleSelect(id)}
              />
            ))}
          </div>

          <Button
            value="저장"
            className="bg-[var(--primary)] text-white shadow-none disabled:bg-[var(--gray-1)] disabled:text-[var(--gray-6)]"
            disabled={!isChanged()}
            onClick={handleSave}
          />
        </div>
      )}

      {/* 2. 그룹 편집 뷰 (생성/수정 공용) */}
      {view === 'edit' && (
        <CreateGroup onCancel={handleCancelEdit} onComplete={() => setView('list')} />
      )}

      {/* 3. 확인 모달 */}
      <AnimatePresence>
        {showConfirmModal && confirmedGroup && (
          <ConfirmationModal
            groupName={confirmedGroup.name}
            iconName={''}
            mode={'create'} // create | edit | delete 전달
            onClose={handleCloseConfirmModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupList;
