import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';
import { FOOTERHIDDENPREFIX, FOOTERHIDDENURL } from '@/shared/constants/Routes';

const MainLayout = () => {
  const location = useLocation();

  const isFooterHidden =
    FOOTERHIDDENURL.some((route) => location.pathname === route) ||
    FOOTERHIDDENPREFIX.some((route) => location.pathname.startsWith(route));

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
