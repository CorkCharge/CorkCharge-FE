import { useState } from 'react';
import X from './X.svg';

// SaveMarker1~12
import SaveMarker1 from './savemarker/SaveMarker1.svg';
import SaveMarker2 from './savemarker/SaveMarker2.svg';
import SaveMarker3 from './savemarker/SaveMarker3.svg';
import SaveMarker4 from './savemarker/SaveMarker4.svg';
import SaveMarker5 from './savemarker/SaveMarker5.svg';
import SaveMarker6 from './savemarker/SaveMarker6.svg';
import SaveMarker7 from './savemarker/SaveMarker7.svg';
import SaveMarker8 from './savemarker/SaveMarker8.svg';
import SaveMarker9 from './savemarker/SaveMarker9.svg';
import SaveMarker10 from './savemarker/SaveMarker10.svg';
import SaveMarker11 from './savemarker/SaveMarker11.svg';
import SaveMarker12 from './savemarker/SaveMarker12.svg';

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
  onSave: (data: GroupData) => void;
  onCancel: () => void;
};

const EditGroup = ({ onSave, onCancel }: EditGroupProps) => {
  const [groupName, setGroupName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  const handleSave = () => {
    if (!groupName || !selectedIcon) {
      alert('그룹명과 마커를 선택해주세요.');
      return;
    }
    onSave({ name: groupName, iconName: selectedIcon, privacy });
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* 헤더 */}
      <div className="relative flex h-[60px] w-full items-center justify-center">
        <span className="text-[20px] font-bold text-[#35353F]">그룹 편집하기</span>
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
                selected ? 'ring-2 ring-gray-400 ring-offset-2' : ''
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
      <div className="flex flex-col gap-4 px-4 pt-6">
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
      {/* 680px / 852px = 79.8% -> ~80vh */}
      <button
        onClick={handleSave}
        className="absolute left-1/2 h-[52px] w-[312px] -translate-x-1/2 rounded-[10px] bg-[#F3F3F6] text-[16px] font-[700] text-[#80818B]"
        style={{ top: 'calc(80vh - 48px)' }} // 680px 지점이 버튼 상단이 되도록
      >
        완료
      </button>
    </div>
  );
};

export default EditGroup;
