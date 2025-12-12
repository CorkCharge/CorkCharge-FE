import { useState, useEffect } from 'react';
import X from '@/pages/corkagemap/list/X.svg';

// SaveMarker1~12
import SaveMarker1 from '@/pages/corkagemap/list/savemarker/SaveMarker1.svg';
import SaveMarker2 from '@/pages/corkagemap/list/savemarker/SaveMarker2.svg';
import SaveMarker3 from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import SaveMarker4 from '@/pages/corkagemap/list/savemarker/SaveMarker4.svg';
import SaveMarker5 from '@/pages/corkagemap/list/savemarker/SaveMarker5.svg';
import SaveMarker6 from '@/pages/corkagemap/list/savemarker/SaveMarker6.svg';
import SaveMarker7 from '@/pages/corkagemap/list/savemarker/SaveMarker7.svg';
import SaveMarker8 from '@/pages/corkagemap/list/savemarker/SaveMarker8.svg';
import SaveMarker9 from '@/pages/corkagemap/list/savemarker/SaveMarker9.svg';
import SaveMarker10 from '@/pages/corkagemap/list/savemarker/SaveMarker10.svg';
import SaveMarker11 from '@/pages/corkagemap/list/savemarker/SaveMarker11.svg';
import SaveMarker12 from '@/pages/corkagemap/list/savemarker/SaveMarker12.svg';

const markerList = [
  SaveMarker1,
  SaveMarker2,
  SaveMarker3,
  SaveMarker4,
  SaveMarker5,
  SaveMarker6,
  SaveMarker7,
  SaveMarker8,
  SaveMarker9,
  SaveMarker10,
  SaveMarker11,
  SaveMarker12,
];

type GroupData = {
  name: string;
  iconName: string;
  privacy: 'public' | 'private';
};

type EditGroupProps = {
  // 수정 모드일 경우 기존 데이터를 받음 (없으면 생성 모드)
  initialData?: GroupData | null;
  onSave: (data: GroupData) => void;
  onCancel: () => void;
};

const CreateGroup = ({ initialData, onSave, onCancel }: EditGroupProps) => {
  const [groupName, setGroupName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  // 초기 데이터가 있으면 상태 업데이트 (편집 모드 진입 시)
  useEffect(() => {
    if (initialData) {
      setGroupName(initialData.name);
      setSelectedIcon(initialData.iconName);
      setPrivacy(initialData.privacy);
    }
  }, [initialData]);

  const isValid = groupName.trim().length > 0 && selectedIcon !== null;
  // 헤더 타이틀 동적 처리
  const headerTitle = initialData ? '그룹 편집하기' : '새 그룹 만들기';

  const handleSave = () => {
    if (!groupName || !selectedIcon) {
      alert('그룹명과 마커를 선택해주세요.');
      return;
    }
    onSave({ name: groupName, iconName: selectedIcon, privacy });
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      {/* 헤더 */}
      <div className="relative flex h-[60px] w-full items-center justify-center">
        <span className="text-[20px] font-bold text-[#35353F]">{headerTitle}</span>
        <button onClick={onCancel} className="absolute right-4 top-1/2 -translate-y-1/2">
          <img src={X} alt="close" />
        </button>
      </div>

      {/* 그룹명 입력 */}
      <div className="relative w-full border-b border-[#DBDDE1] px-4 pb-2">
        <input
          type="text"
          value={groupName}
          onChange={(e) => {
            if (e.target.value.length <= 10) {
              setGroupName(e.target.value);
            }
          }}
          placeholder="그룹명 (최대 10자)"
          className="w-full text-[14px] font-[500] text-[#35353F] focus:outline-none"
        />
        <span className="absolute right-4 top-0 text-[14px] font-[500] text-[#C5C8CF]">
          {groupName.length}/10
        </span>
      </div>

      {/* 마커 선택 그리드 */}
      <div className="mx-auto mt-6 grid w-fit grid-cols-4 gap-x-[30px] gap-y-[18px]">
        {markerList.map((Icon, i) => {
          const name = `SaveMarker${i + 1}`;
          const selected = selectedIcon === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedIcon(name)}
              className={`relative h-8 w-8 rounded-full ${
                selected ? 'ring-2 ring-[#90212A] ring-offset-2' : ''
              }`}
            >
              <img src={Icon} alt={name} />
            </button>
          );
        })}
      </div>

      {/* 구분선 */}
      <div className="mt-[29px] h-[8px] w-full bg-[#F3F3F6]" />

      {/* 공개/비공개 설정 */}
      <div className="mb-10 flex w-full flex-col gap-4 px-4 pt-6">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="privacy"
            value="public"
            checked={privacy === 'public'}
            onChange={() => setPrivacy('public')}
            className="h-5 w-5 accent-[#90212A]"
          />
          <div>
            <p className="text-[14px] font-[500] text-[#35353F]">공개</p>
            <p className="text-[10px] font-[500] text-[#9FA2AA]">
              URL로 다른 사람에게 리스트를 공유할 수 있습니다.
            </p>
          </div>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="privacy"
            value="private"
            checked={privacy === 'private'}
            onChange={() => setPrivacy('private')}
            className="h-5 w-5 accent-[#90212A]"
          />
          <div>
            <p className="text-[14px] font-[500] text-[#35353F]">비공개</p>
            <p className="text-[10px] font-[500] text-[#9FA2AA]">
              나만 볼 수 있으며, 다른 사람과 리스트를 공유할 수 없습니다.
            </p>
          </div>
        </label>
      </div>

      {/* 완료 버튼 (vh로 위치 고정) */}
      <button
        onClick={handleSave}
        disabled={!isValid}
        className={`h-[52px] w-4/5 rounded-[10px] text-[16px] font-[700] transition-colors ${
          isValid
            ? 'cursor-pointer bg-[#90212A] text-[#fff]'
            : 'cursor-not-allowed bg-[#F3F3F6] text-[#80818B]'
        }`}
        // style={{ top: 'calc(75vh - 48px)' }}
      >
        완료
      </button>
    </div>
  );
};

export default CreateGroup;
