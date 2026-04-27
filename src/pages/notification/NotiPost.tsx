import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import Button from '../../shared/components/common/Button';
import { useNotificationDetail } from '@/shared/queries/notification/useNotificationDetail';
import { NOTI_TYPE_MAPPING } from '@/shared/apis/notification/notification.type';

import loudSpeaker from '@/shared/components/notification/images/loudspeaker.png';
import whiteArrow from '@/shared/assets/arrow.svg';
import { ClipLoader } from 'react-spinners';

function NotiPost() {
  const navigate = useNavigate();

  const { id } = useParams();
  const notiId = Number(id);

  const { data: notification, isLoading } = useNotificationDetail(notiId);

  if (isLoading)
    return (
      <div className="flex h-[100px] items-center justify-center">
        <ClipLoader color="var(--primary)" />
      </div>
    );
  if (!notification) {
    return <div>존재하지 않는 알림입니다</div>;
  }

  return (
    <div>
      <Header title="알림" className="mx-4" />

      {/* 공지 사항 */}
      <div
        className="relative flex h-[72px] items-center gap-5 px-4"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%)',
        }}
      >
        <img src={loudSpeaker} className="h-[22px] w-6" />
        <div className="flex flex-col font-medium text-white">
          <p>깍뚝 건대점의 콜키지가 등록되었어요!</p>
          <span className="text-[10px]">2025년 05월 17일</span>
        </div>
        <img src={whiteArrow} className="absolute right-4 top-1/2 h-5 w-[11px] -translate-y-1/2" />
      </div>

      {/* 알림 본문 */}
      <div className="mx-8 mt-6">
        <div className="items-cenrte flex justify-between">
          <span className="rounded-[20px] bg-[rgba(144,33,70,0.15)] px-4 py-2 font-medium text-[var(--primary)]">
            {NOTI_TYPE_MAPPING[notification.type]}
          </span>
          <span className="flex items-center text-sm font-medium text-[var(--gray-4)]">
            {new Date(notification.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[var(--gray-8)]">{notification.title}</h1>
          <p className="my-3">{notification.content}</p>
          <Button
            value="닫기"
            className="fixed bottom-10 left-10 right-10 mx-auto w-[80%] max-w-[480px] text-[var(--gray-8)]"
            onClick={() => navigate('/notification')}
          />
        </div>
      </div>
    </div>
  );
}

export default NotiPost;
