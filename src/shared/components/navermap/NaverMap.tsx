import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const center = new window.naver.maps.LatLng(37.543654, 127.070138);

    const map = new window.naver.maps.Map(mapRef.current, {
      center: center,
      zoom: 19,
    });

    new window.naver.maps.Marker({
      position: center,
      map: map,
    });
  }, []);

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
