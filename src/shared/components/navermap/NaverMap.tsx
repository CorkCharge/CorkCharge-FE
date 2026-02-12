import { useEffect, useRef, useCallback } from 'react';
//import { useNavigate } from 'react-router-dom';
import { getMapData } from '@/shared/apis/map/mapApi';
import type { MapLevel, MapRestaurantData } from '@/shared/types/map';
import Bottle from './bottle.svg';

// [1] Ref에 사용할 데이터 타입 정의
interface MarkerData {
  count: number;
  name: string;
  size: number;
}

/* =========================
   유틸 함수 (컴포넌트 외부)
   ========================= */
const getDongFromAddress = (address: string): string | null => {
  if (!address) return null;
  const m = address.match(/\(([^)]+)\)\s*$/);
  if (m) {
    const innerTokens = m[1].trim().split(/\s+/);
    const cand = innerTokens.find((t) => /(동|읍|면|리)$/.test(t));
    if (cand) return cand;
  }
  const parts = address.split(/\s+/).reverse();
  const cand2 = parts.find((t) => /(동|읍|면|리)$/.test(t));
  if (cand2) return cand2;
  const cand3 = parts.find((t) => /(구|군|시)$/.test(t));
  if (cand3) return cand3;
  return null;
};

type DongBucket = {
  name: string;
  count: number;
  sumLat: number;
  sumLon: number;
  ids: number[];
};

const groupByDong = (points: MapRestaurantData[]) => {
  const map = new Map<string, DongBucket>();
  for (const p of points) {
    const parsed = getDongFromAddress(p.address);
    const dong = parsed ?? '기타';
    const b = map.get(dong);
    if (b) {
      b.count += 1;
      b.sumLat += p.lat;
      b.sumLon += p.lon;
      b.ids.push(p.restaurantId);
    } else {
      map.set(dong, {
        name: dong,
        count: 1,
        sumLat: p.lat,
        sumLon: p.lon,
        ids: [p.restaurantId],
      });
    }
  }
  return Array.from(map.values()).map((b) => ({
    name: b.name,
    count: b.count,
    centerLat: b.sumLat / b.count,
    centerLon: b.sumLon / b.count,
    restaurantIds: b.ids,
  }));
};

const getMapLevel = (zoom: number): MapLevel => {
  if (zoom >= 17) return 'restaurant';
  if (zoom >= 14) return 'dong';
  if (zoom >= 11) return 'sigungu';
  return 'sido';
};

const createClusterMarkerHtml = (count: number, isSelected: boolean = false): string => {
  const size = 35 + count * 1.5;
  const activeBackground = `
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), 
                radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%);
  `;
  const defaultBackground = `background-color: #90212A;`;

  return `
    <div style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      width:${size}px; height:${size}px;
      ${isSelected ? activeBackground : defaultBackground}
      color:white; font-size:12px; font-weight:bold; border-radius:50%;
      box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:all 0.2s; padding:4px; cursor: pointer;
    ">
      <div style="font-size:14px; line-height:1">${count}</div>
    </div>
  `;
};

const createRestaurantMarkerHtml = (
  price: string,
  name: string,
  isSelected: boolean = false
): string => {
  if (isSelected) {
    // [선택됨] 물방울 + 병 + 가격
    return `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="
          width: 72px; height: 72px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid #FFF;
          background: radial-gradient(151% 149.45% at -10.81% 68.19%, #90212A 0%, #DCDBE8 70.67%);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 8px;
          z-index: 1000;
        ">
          <img src="${Bottle}" style="width: 24px; height: 48px; transform: rotate(45deg);" alt="bottle" />
        </div>
        <div style="
          padding: 8px 12px;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), 
                      radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%);
          color: white; font-size: 14px; font-weight: bold; border-radius: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;
        ">
          ${price}
        </div>
        <div style="
          color: #333; font-size: 14px; font-weight: 700; 
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; 
          /* 텍스트 가독성을 위해 흰색 테두리(그림자) 효과 추가 */
        ">
          ${name}
        </div>
      </div>
    `;
  }

  // [기본 상태] 단순 가격표
  return `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="
      padding: 12px; background-color: #90212A; color: white;
      font-size: 14px; font-weight: bold; border-radius: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;
    ">
      ${price}
    </div>
    <div style="
        color: #333; font-size: 14px; font-weight: 700; 
        text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
        margin-top: 4px;
      ">
        ${name}
      </div>
      </div>
  `;
};

interface NaverMapProps {
  onClusterClick?: (_name: string, _restaurantIds: number[]) => void;
  onRestaurantClick?: (_restaurantId: number) => void;
}

const NaverMap = ({ onClusterClick, onRestaurantClick }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);
  //const navigate = useNavigate();

  // [2] Ref에 타입 명시
  const selectedMarkerRef = useRef<naver.maps.Marker | null>(null);
  const selectedMarkerDataRef = useRef<MarkerData | null>(null);

  // [추가] 개별 식당 마커용 Ref (선택된 마커와 가격만 저장)
  const selectedRestaurantRef = useRef<{
    marker: naver.maps.Marker;
    price: string;
    name: string;
  } | null>(null);

  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
    selectedMarkerRef.current = null;
    selectedMarkerDataRef.current = null;
    selectedRestaurantRef.current = null;
  };

  // [추가] 식당 마커 클릭 핸들러 (상태 관리 로직)
  const handleRestaurantClick = useCallback(
    (marker: naver.maps.Marker, price: string, name: string) => {
      const prev = selectedRestaurantRef.current;

      // 1. 이전에 선택된 게 있고, 지금 누른 게 아니라면 -> 원래대로 복구
      if (prev && prev.marker !== marker) {
        prev.marker.setIcon({
          content: createRestaurantMarkerHtml(prev.price, prev.name, false),
          anchor: new window.naver.maps.Point(30, 15),
        });
        prev.marker.setZIndex(100);
      }

      // 2. 현재 누른 마커 -> 강조 스타일로 변경
      marker.setIcon({
        content: createRestaurantMarkerHtml(price, name, true),
        // 물방울 꼬리가 지도 좌표에 맞도록 앵커 조정 (가로 72의 반, 세로 전체 + 마진)
        anchor: new window.naver.maps.Point(36, 85),
      });
      marker.setZIndex(1000); // 맨 위로

      // 3. 현재 상태 저장
      selectedRestaurantRef.current = { marker, price, name };
    },
    []
  );

  // [추가] 빈 공간 클릭 시 선택 해제 핸들러
  const handleMapClick = useCallback(() => {
    const prev = selectedRestaurantRef.current;

    // 선택된 식당 마커가 있다면 -> 원래대로 복구
    if (prev) {
      prev.marker.setIcon({
        content: createRestaurantMarkerHtml(prev.price, prev.name, false),
        anchor: new window.naver.maps.Point(30, 15),
      });
      prev.marker.setZIndex(100);
      selectedRestaurantRef.current = null; // 상태 초기화
    }
  }, []);

  // [3] handleClusterMarkerClick를 먼저 정의하고 useCallback으로 감쌉니다.
  // (이 함수가 아래 fetchAndDrawMarkers에서 사용되기 때문입니다)
  const handleClusterMarkerClick = useCallback(
    (marker: naver.maps.Marker, data: MarkerData, restaurantIds: number[]) => {
      // 1. 이전 마커 복구
      const prevMarker = selectedMarkerRef.current;
      const prevData = selectedMarkerDataRef.current;

      if (prevMarker && prevData && prevMarker !== marker) {
        prevMarker.setIcon({
          content: createClusterMarkerHtml(prevData.count, false),
          anchor: new window.naver.maps.Point(prevData.size / 2, prevData.size / 2),
        });
      }

      // 2. 현재 마커 변경
      marker.setIcon({
        content: createClusterMarkerHtml(data.count, true),
        anchor: new window.naver.maps.Point(data.size / 2, data.size / 2),
      });

      // 3. 저장
      selectedMarkerRef.current = marker;
      selectedMarkerDataRef.current = data;

      // 4. 부모 알림
      if (onClusterClick) {
        onClusterClick(data.name, restaurantIds);
      }
    },
    [onClusterClick] // onClusterClick이 바뀌면 이 함수도 갱신됨 (Stale Closure 방지)
  );

  // [4] fetchAndDrawMarkers도 useCallback으로 감쌉니다.
  // handleClusterMarkerClick이 갱신되면 얘도 갱신되어야 이벤트 리스너가 최신 함수를 바라봅니다.
  const fetchAndDrawMarkers = useCallback(async () => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    const rawBounds = map.getBounds();

    if (!(rawBounds instanceof naver.maps.LatLngBounds)) return;

    const zoom = map.getZoom();
    const level = getMapLevel(zoom);

    const mapParams = {
      latMin: rawBounds.south(),
      latMax: rawBounds.north(),
      lonMin: rawBounds.west(),
      lonMax: rawBounds.east(),
    };

    console.log('[NaverMap] UI에서 생성한 요청 데이터:', mapParams);

    try {
      const response = await getMapData(mapParams);
      clearMarkers();

      // 1. 개별 매장
      if (level === 'restaurant') {
        const restaurantData = response.data as MapRestaurantData[];
        restaurantData.forEach((item) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(item.lat, item.lon),
            map: map,
            icon: {
              content: createRestaurantMarkerHtml(item.corkagePrice, item.restaurantName),
              anchor: new window.naver.maps.Point(30, 15),
            },
          });

          // [수정] 클릭 시 handleRestaurantClick 호출 (가격 정보만 넘김)
          naver.maps.Event.addListener(marker, 'click', () => {
            handleRestaurantClick(marker, item.corkagePrice, item.restaurantName);
            // navigate(`/detail-info/${item.restaurantId}`); // 필요하면 주석 해제
            if (onRestaurantClick) {
              onRestaurantClick(item.restaurantId);
            }
          });

          markers.current.push(marker);
        });
      }
      // 2. 동 단위
      else if (level === 'dong') {
        const clusterData = response.data as MapRestaurantData[];
        const dongClusters = groupByDong(clusterData);

        dongClusters.forEach(({ name, count, centerLat, centerLon, restaurantIds }) => {
          const size = 35 + count * 1.5;
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            title: name,
            icon: {
              content: createClusterMarkerHtml(count, false),
              anchor: new window.naver.maps.Point(size / 2, size / 2),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name, size }, restaurantIds);
          });

          markers.current.push(marker);
        });
      }
      // 3. 시/군/구
      else {
        const restaurantData = response.data as MapRestaurantData[];
        if (restaurantData.length > 0) {
          const centerLat =
            restaurantData.reduce((acc, cur) => acc + cur.lat, 0) / restaurantData.length;
          const centerLon =
            restaurantData.reduce((acc, cur) => acc + cur.lon, 0) / restaurantData.length;
          const count = restaurantData.length;
          const size = 35 + count * 1.5;

          const sample = restaurantData[0].address || '';
          const areaName =
            level === 'sigungu'
              ? (sample.match(/([가-힣A-Za-z0-9]+(?:구|군|시))/)?.[1] ?? '선택 지역')
              : (sample.match(/([가-힣]+(?:특별시|광역시|특별자치시|특별자치도|도))/)?.[1] ??
                '선택 지역');

          const restaurantIds = restaurantData.map((d) => d.restaurantId);
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            title: areaName,
            icon: {
              content: createClusterMarkerHtml(count, false),
              anchor: new window.naver.maps.Point(size / 2, size / 2),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name: areaName, size }, restaurantIds);
          });

          markers.current.push(marker);
        }
      }
    } catch (error) {
      console.error('지도 데이터를 가져오는 데 실패했습니다:', error);
    }
  }, [handleClusterMarkerClick, handleRestaurantClick, onRestaurantClick]); // 의존성 추가

  // Effect 1: 지도 초기화 (최초 1회)
  useEffect(() => {
    if (!window.naver || !mapRef.current || mapInstance.current) return;

    const center = new window.naver.maps.LatLng(37.543654, 127.070138);
    const map = new window.naver.maps.Map(mapRef.current, {
      center: center,
      zoom: 17,
      minZoom: 8,
      maxZoom: 20,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
      zoomControl: false,
    });

    mapInstance.current = map;
  }, []);

  // Effect 2: 이벤트 리스너 등록 및 데이터 Fetch
  // fetchAndDrawMarkers가 변경될 때(=부모 props가 바뀌었을 때) 실행됨
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // 1. 데이터 즉시 로드
    fetchAndDrawMarkers();

    // 2. 리스너 등록
    const dragEndListener = naver.maps.Event.addListener(map, 'dragend', fetchAndDrawMarkers);
    const zoomChangedListener = naver.maps.Event.addListener(
      map,
      'zoom_changed',
      fetchAndDrawMarkers
    );

    // [추가] 지도 빈 공간 클릭 리스너
    const mapClickListener = naver.maps.Event.addListener(map, 'click', handleMapClick);

    // 3. Cleanup: 리스너 중복 방지
    return () => {
      naver.maps.Event.removeListener(dragEndListener);
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(mapClickListener); // [추가] 해제
    };
  }, [fetchAndDrawMarkers, handleMapClick]);

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
