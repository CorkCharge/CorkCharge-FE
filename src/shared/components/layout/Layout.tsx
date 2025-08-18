import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  const footerHiddenPrefix: string[] = ['/onBoarding'];
  const isFooterHidden = footerHiddenPrefix.some((route) => location.pathname === route);
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
