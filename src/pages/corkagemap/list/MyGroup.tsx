import { useState, useEffect, useRef } from 'react';
import EditDots from './editDots.svg';
import Settings from './edit.svg'; // 편집 아이콘
import Trash from './trash.svg'; // 삭제 아이콘

// SaveMarker icons (small)
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

const smallMarkers: Record<string, string> = {
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
};

type MyGroupProps = {
  id: number;
  iconName: string;
  name: string;
  count: number;
  onEdit: (id: number) => void; // 부모로부터 받은 편집 핸들러
  onDelete: (id: number) => void; // 부모로부터 받은 삭제 핸들러
  onClick: () => void; // [추가] 그룹 클릭 시 실행할 함수
};

const MyGroup = ({ id, iconName, name, count, onEdit, onDelete, onClick }: MyGroupProps) => {
  const IconSrc = smallMarkers[iconName];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모(MyGroup)의 onClick이 실행되지 않도록 이벤트 전파 막기
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      onClick={onClick} // 전체 영역 클릭 시 MyStore로 이동
      className="relative flex w-full cursor-pointer items-center border-b border-[#DBDDE1] py-4"
    >
      {IconSrc && <img src={IconSrc} alt={iconName} className="h-[23px] w-[23px]" />}
      <span className="ml-[12px] text-[14px] font-[500] text-[#35353F]">{name}</span>
      <span className="ml-[8px] text-[12px] font-[500] text-[#9FA2AA]">{count}</span>

      {/* Edit Dots & Popup Menu Container */}
      <div className="relative ml-auto" ref={menuRef}>
        <div className="cursor-pointer p-1" onClick={handleToggleMenu}>
          <img src={EditDots} alt="EditDots" />
        </div>

        {/* 팝업 메뉴 */}
        {isMenuOpen && (
          <div
            className="absolute right-0 top-6 z-10 flex flex-col justify-center rounded-[8px] bg-[#F3F3F6] shadow-md"
            // 뷰포트 기준 393px -> 102px, 852px -> 60px 요청 반영
            style={{ width: '102px', height: '60px' }}
            onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시에도 이동 방지
          >
            {/* 편집하기 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 이동 방지
                setIsMenuOpen(false);
                onEdit(id);
              }}
              className="flex flex-1 items-center gap-2 rounded-t-[8px] px-3 hover:bg-gray-200"
            >
              <img src={Settings} alt="edit" style={{ width: '14.695px', height: '14.695px' }} />
              <span className="text-[12px] font-[500] text-[#9FA2AA]">편집하기</span>
            </button>

            {/* 삭제하기 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 이동 방지
                setIsMenuOpen(false);
                onDelete(id);
              }}
              className="flex flex-1 items-center gap-2 rounded-b-[8px] px-3 hover:bg-gray-200"
            >
              <img src={Trash} alt="trash" style={{ width: '12px', height: '14px' }} />
              <span className="text-[12px] font-[500] text-[#9FA2AA]">삭제하기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroup;
