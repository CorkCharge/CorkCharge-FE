import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';

import PairingArticle from './PairingArticle';
import type { RestaurantInfo } from '@/shared/apis/restaurant/corkageApi';

const DetailInfo = ({ restaurant }: { restaurant: RestaurantInfo }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hash = useRef<string>('-1');

  useEffect(() => {
    hash.current = location.hash;

    // 해시가 있으면 해당 id로 스크롤
    if (hash.current) {
      const id = hash.current.replace('#', '');
      hash.current = hash.current.replace('#', '');
      // setTimeout 또는 requestAnimationFrame으로 렌더링 후 스크롤
      console.log(id);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        console.log(el);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      });
    } else {
      // 해시 없으면 최상단
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash, hash]);

  return (
    <>
      {restaurant.pairingAlcohol ? (
        <div className="flex justify-center px-4">
          <PairingArticle {...restaurant} />
        </div>
      ) : (
        <p className="flex justify-center pb-4 font-semibold">
          코르크차지가 금방 페어링을 추천해드릴게요
        </p>
      )}
    </>
  );
};

export default DetailInfo;
