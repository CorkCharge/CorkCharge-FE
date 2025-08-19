import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import useFooterPropsStore from '@/shared/store/useFooterProps';

import Footer from './Footer';
import { FOOTERHIDDENPREFIX, FOOTERHIDDENURL, FOOTERROUTER } from '@/shared/constants/Routes';

const FooterSync = () => {
  const location = useLocation();
  const setFooterProps = useFooterPropsStore((s) => s.setFooterProps);

  useEffect(() => {
    if (FOOTERROUTER.home.some((route) => location.pathname.startsWith(route))) {
      setFooterProps(0);
    } else if (FOOTERROUTER.map.some((route) => location.pathname.startsWith(route))) {
      setFooterProps(1);
    } else if (FOOTERROUTER.book.some((route) => location.pathname.startsWith(route))) {
      setFooterProps(2);
    } else if (FOOTERROUTER.save.some((route) => location.pathname.startsWith(route))) {
      setFooterProps(3);
    } else if (FOOTERROUTER.mypage.some((route) => location.pathname.startsWith(route))) {
      setFooterProps(4);
    }
  }, [location.pathname, setFooterProps]);

  return null; // UI 없음
};

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
      <FooterSync />
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default MainLayout;
