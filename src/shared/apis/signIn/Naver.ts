export const NaverLogIn = () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const STATE = false;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  window.location.href = NAVER_AUTH_URL;
};
