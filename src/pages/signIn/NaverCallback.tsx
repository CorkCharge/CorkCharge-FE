import { SyncLoader } from 'react-spinners';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import apiClient from '@/shared/apis/apiClient';
import useAuthStore from '@/shared/store/useAuthStore';
import { fetchMyTips } from '@/shared/apis/bookmark/bookmarkApi';
import useTipStore from '@/shared/store/useTipStore';
import { type MyTipsResponse } from '@/shared/apis/bookmark/bookmarks.type';

function NaverCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const setSelectedTips = useTipStore((state) => state.setSelectedTips);

  useEffect(() => {
    loginProcess();
  }, []);

  const loginProcess = async () => {
    const code = params.get('code');
    const state = params.get('state');

    // 로그인 시도
    try {
      const loginResponse = await apiClient.get('/oauth/naver/login', { params: { code, state } });
      const loginOk = login(loginResponse.data.data);

      if (loginOk) {
        if (loginResponse.data.data.role) navigate('/home');
        else navigate('/my/role');
      }
    } catch (e) {
      console.error('로그인 실패 : ' + e);
      alert('로그인에 실패하였습니다. 잠시 후 다시 시도해주세요');
      navigate('/signin');
    }

    // 내가 저장한 팁들 가져오기
    try {
      const tipsRes = await fetchMyTips();
      setSelectedTips(tipsRes.map((res: MyTipsResponse) => res.tipId));
    } catch (e) {
      console.error('저장한 팁 가져오기 실패: ' + e);
    }

    return true;
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <SyncLoader color={'var(--primary)'} />
    </div>
  );
}

export default NaverCallback;
