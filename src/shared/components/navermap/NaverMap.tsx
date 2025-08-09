import { useEffect, useRef } from 'react';
import { getMapData } from '@/shared/apis/map/mapApi';
import type { MapLevel, ClusterPoint, RestaurantPoint } from '@/shared/types/map';

const NaverMap = () => {
  // 지도를 담을 DOM 요소를 참조합니다.
  const mapRef = useRef<HTMLDivElement | null>(null);
  // 생성된 네이버 맵 인스턴스를 저장합니다. 불필요한 리렌더링을 막기 위해 ref를 사용합니다.
  const mapInstance = useRef<naver.maps.Map | null>(null);
  // 현재 지도에 표시된 마커들을 저장합니다.
  const markers = useRef<naver.maps.Marker[]>([]);

  /**
   * 줌 레벨에 따라 API 요청에 사용할 'level' 문자열을 반환합니다.
   * @param zoom - 현재 지도의 줌 레벨
   */
  const getMapLevel = (zoom: number): MapLevel => {
    if (zoom >= 17) return 'restaurant';
    if (zoom >= 14) return 'dong';
    if (zoom >= 11) return 'sigungu';
    return 'sido';
  };

  /**
   * 클러스터 마커(원)의 HTML 문자열을 생성합니다.
   * @param count - 클러스터에 포함된 매장 수
   */
  const createClusterMarkerHtml = (count: number): string => {
    // 매장 수에 비례하여 원의 크기를 조절합니다.
    const size = 35 + count * 1.5;
    return `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${size}px;
        height: ${size}px;
        background-color: #90212A;
        color: white;
        font-size: 14px;
        font-weight: bold;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s;
      ">
        ${count}
      </div>
    `;
  };

  /**
   * 개별 매장 마커(가격)의 HTML 문자열을 생성합니다.
   * @param price - 콜키지 가격 정보
   */
  const createRestaurantMarkerHtml = (price: string): string => {
    return `
      <div style="
        padding: 12px;
        background-color: #90212A;
        color: white;
        font-size: 14px;
        font-weight: bold;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        white-space: nowrap;
      ">
        ${price}
      </div>
    `;
  };

  /**
   * 이전에 생성된 모든 마커를 지도에서 제거합니다.
   */
  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
  };

  /**
   * 지도 상태(줌, 위치)가 변경될 때마다 API를 호출하여 마커를 다시 그립니다.
   */
  const fetchAndDrawMarkers = async () => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;
    const raw = map.getBounds();

    const zoom = map.getZoom();
    const level = getMapLevel(zoom);

    // [수정된 부분] 메서드를 호출하여 숫자 값을 가져오도록 수정합니다.
    if (raw instanceof naver.maps.LatLngBounds) {
      const mapBounds = {
        level,
        latMin: raw.south(),
        latMax: raw.north(),
        lonMin: raw.west(),
        lonMax: raw.east(),
      };

      try {
        const response = await getMapData(mapBounds);
        clearMarkers(); // 기존 마커 제거

        if (level === 'restaurant') {
          // 개별 매장 마커 생성
          const restaurantData = response.data as RestaurantPoint[];
          restaurantData.forEach((item) => {
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(item.latitude, item.longitude),
              map: map,
              icon: {
                content: createRestaurantMarkerHtml(item.price),
                anchor: new window.naver.maps.Point(30, 15), // 마커의 기준점 조정
              },
            });
            markers.current.push(marker);
          });
        } else {
          // 클러스터 마커 생성
          const clusterData = response.data as ClusterPoint[];
          if (clusterData.length > 0) {
            // 클러스터의 중심점을 계산합니다. (모든 좌표의 평균)
            const centerLat =
              clusterData.reduce((acc, cur) => acc + cur.latitude, 0) / clusterData.length;
            const centerLon =
              clusterData.reduce((acc, cur) => acc + cur.longitude, 0) / clusterData.length;

            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(centerLat, centerLon),
              map: map,
              icon: {
                content: createClusterMarkerHtml(clusterData.length),
                anchor: new window.naver.maps.Point(15, 15), // 마커의 기준점 조정
              },
            });
            markers.current.push(marker);
          }
        }
      } catch (error) {
        console.error('지도 데이터를 가져오는 데 실패했습니다:', error);
      }
    }
  };

  // 컴포넌트가 처음 마운트될 때 지도를 초기화합니다.
  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const center = new window.naver.maps.LatLng(37.543654, 127.070138);

    // 지도 인스턴스 생성
    const map = new window.naver.maps.Map(mapRef.current, {
      center: center,
      zoom: 17, // 초기 줌 레벨을 'restaurant'으로 설정
      minZoom: 8, // 최소 줌 레벨
      maxZoom: 20, // 최대 줌 레벨
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
      zoomControl: true,
    });

    mapInstance.current = map;

    // 지도 로드 완료 후 첫 데이터 로딩
    naver.maps.Event.once(map, 'init', () => {
      fetchAndDrawMarkers();
    });

    // 지도 드래그가 끝나거나 줌이 변경될 때마다 마커를 다시 그리도록 이벤트 리스너를 등록합니다.
    naver.maps.Event.addListener(map, 'dragend', fetchAndDrawMarkers);
    naver.maps.Event.addListener(map, 'zoom_changed', fetchAndDrawMarkers);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      if (map) {
        naver.maps.Event.clearInstanceListeners(map);
      }
    };
  }, []); // [수정된 부분] 의존성 배열 추가

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
