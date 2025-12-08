import { motion } from 'framer-motion';
// SaveMarker icons (big)
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

const markerIcons: Record<string, string> = {
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

const markerColorMap: Record<string, string> = {
  SaveMarker1: '#D9534F',
  SaveMarker2: '#F0AD4E',
  SaveMarker3: '#5BC0DE',
  SaveMarker4: '#5CB85C',
  SaveMarker5: '#428BCA',
  SaveMarker6: '#9B59B6',
  SaveMarker7: '#34495E',
  SaveMarker8: '#E74C3C',
  SaveMarker9: '#1ABC9C',
  SaveMarker10: '#F39C12',
  SaveMarker11: '#8E44AD',
  SaveMarker12: '#2C3E50',
};

type ConfirmationModalProps = {
  groupName: string;
  iconName: string;
  onClose: () => void;
  mode?: 'create' | 'edit' | 'delete';
};

const ConfirmationModal = ({
  groupName,
  iconName,
  onClose,
  mode = 'create',
}: ConfirmationModalProps) => {
  const IconSrc = markerIcons[iconName];
  const textColor = markerColorMap[iconName] ?? '#35353F';

  // 모드별 메시지 분기
  let message = '';
  switch (mode) {
    case 'create':
      message = '그룹이 생성되었습니다!';
      break;
    case 'edit':
      message = '그룹이 편집되었습니다!';
      break;
    case 'delete':
      message = '그룹이 삭제되었습니다.';
      break;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex h-[170px] w-[299px] flex-col items-center justify-center bg-white"
        style={{
          borderRadius: '24px 8px 24px 8px', // 피그마 디자인 적용
        }}
      >
        <div className="flex items-center gap-2">
          {IconSrc && <img src={IconSrc} alt={iconName} />}
          <span className="text-[20px] font-bold" style={{ color: textColor }}>
            {groupName}
          </span>
        </div>
        <p className="mt-2 text-[16px] font-[500] text-[#35353F]">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 h-[48px] w-[263px] rounded-[12px] bg-[#90212A] text-[16px] font-bold text-white"
        >
          확인
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
