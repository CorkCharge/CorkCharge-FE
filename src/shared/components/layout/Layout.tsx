import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // 페이지 이동 시 항상 스크롤 최상단 유지
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const isFooterHidden =
    FOOTERHIDDENURL.some((route) => location.pathname.toLowerCase() === route.toLowerCase()) ||
    FOOTERHIDDENPREFIX.some((route) =>
      location.pathname.toLowerCase().startsWith(route.toLowerCase())
    );

  return (
    <div className="flex h-svh flex-col">
      <div className="flex-1 overflow-auto" ref={scrollRef}>
        <Outlet />
      </div>
      <FooterSync />
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default MainLayout;
