import { useNavigate } from 'react-router-dom';
import logo from './assets/logo_search.svg';
import rightArrow from '../../shared/assets/right_arrow.svg';
const DoitComplete = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-svh px-4"
      style={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(151% 149.45% at -10.81% 68.19%, #90212A 0%, #DCDBE8 70.67%), #FFF',
      }}
    >
      {/* 헤더 */}
      <div className="relative flex h-12 items-center justify-center text-center font-bold text-[var(--gray-8)]">
        해주세요
        <img
          src={rightArrow}
          className="absolute left-0 rotate-180 cursor-pointer"
          onClick={() => navigate('/doit/list')}
        />
      </div>

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <img src={logo} alt="로고" className="mb-8 inline-block h-[173px] w-[105px]" />
        <div className="mb-[75px] flex flex-col items-center text-xl font-bold text-white">
          <p>해주세요 서비스의</p>
          <p>접수가 완료되었습니다.</p>
        </div>
        <button className="m-auto flex h-[48px] w-[171.6px] cursor-pointer items-center justify-center gap-[10px] rounded-[12px] bg-white/50">
          <div className="font-semibold" onClick={() => navigate('/home')}>
            홈으로 돌아가기
          </div>
          <img src={rightArrow} alt="오른쪽 화살표" className="h-4 w-[9px]" />
        </button>
      </div>
    </div>
  );
};

export default DoitComplete;
