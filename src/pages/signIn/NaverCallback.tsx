import apiClient from '@/shared/apis/apiClient';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '@/shared/store/useAuthStore';

function NaverCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useAuthStore();

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');

    if (code && state) {
      apiClient
        .get('/oauth/naver/login', { params: { code, state } })
        .then((res) => {
          login(res.data.data);
        })
        .catch((e) => {
          console.error('로그인 실패 : ' + e);
          alert('로그인에 실패하였습니다. 잠시 후 다시 시도해주세요');
          navigate(-1);
        });
    }
  }, [params]);
  return <div></div>;
}

export default NaverCallback;
