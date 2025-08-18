import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  const footerHiddenUrl: string[] = ['/my/modify'];
  const footerHiddenPrefix: string[] = ['/onboarding', '/signin'];
  const isFooterHidden =
    footerHiddenUrl.some((route) => location.pathname === route) ||
    footerHiddenPrefix.some((route) => location.pathname.startsWith(route));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default MainLayout;
