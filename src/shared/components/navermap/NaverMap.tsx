import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMapData } from '@/shared/apis/map/mapApi';
import type { MapLevel, ClusterPoint, RestaurantPoint } from '@/shared/types/map';

/* =========================
   유틸 함수 (동명 파싱/그룹핑)
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

const groupByDong = (points: ClusterPoint[]) => {
  const map = new Map<string, DongBucket>();
  for (const p of points) {
    const parsed = getDongFromAddress(p.address);
    const dong = parsed ?? '기타';
    const b = map.get(dong);
    if (b) {
      b.count += 1;
      b.sumLat += p.latitude;
      b.sumLon += p.longitude;
      b.ids.push(p.restaurantId);
    } else {
      map.set(dong, {
        name: dong,
        count: 1,
        sumLat: p.latitude,
        sumLon: p.longitude,
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

interface NaverMapProps {
  onClusterClick?: (_name: string, _restaurantIds: number[]) => void;
}

const NaverMap = ({ onClusterClick }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);
  const navigate = useNavigate();

  // 1. 선택된 마커 객체 저장 (스타일 복구용)
  const selectedMarkerRef = useRef<naver.maps.Marker | null>(null);

  // 2. 선택된 마커의 데이터 저장 (복구 시 원래 텍스트/사이즈 복원용)
  const selectedMarkerDataRef = useRef<{ count: number; name: string; size: number } | null>(null);

  const getMapLevel = (zoom: number): MapLevel => {
    if (zoom >= 17) return 'restaurant';
    if (zoom >= 14) return 'dong';
    if (zoom >= 11) return 'sigungu';
    return 'sido';
  };

  /**
   * 클러스터 마커 HTML 생성
   * isSelected가 true일 때 그라데이션 배경 적용
   */
  const createClusterMarkerHtml = (count: number, isSelected: boolean = false): string => {
    const size = 35 + count * 1.5;

    const activeBackground = `
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), 
                  radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%);
    `;
    const defaultBackground = `background-color: #90212A;`;

    return `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:${size}px;
        height:${size}px;
        ${isSelected ? activeBackground : defaultBackground}
        color:white;
        font-size:12px;
        font-weight:bold;
        border-radius:50%;
        box-shadow:0 2px 4px rgba(0,0,0,0.2);
        transition:all 0.2s;
        padding:4px;
        cursor: pointer;
      ">
        <div style="font-size:14px; line-height:1">${count}</div>
      </div>
    `;
  };

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

  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
    // 마커가 사라지면 선택 상태도 초기화
    selectedMarkerRef.current = null;
    selectedMarkerDataRef.current = null;
  };

  const fetchAndDrawMarkers = async () => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;
    const rawBounds = map.getBounds();

    if (!(rawBounds instanceof naver.maps.LatLngBounds)) return;

    const zoom = map.getZoom();
    const level = getMapLevel(zoom);

    const mapBounds = {
      level,
      latMin: rawBounds.south(),
      latMax: rawBounds.north(),
      lonMin: rawBounds.west(),
      lonMax: rawBounds.east(),
    };

    try {
      const response = await getMapData(mapBounds);
      clearMarkers();

      // 1. 개별 매장 레벨 (기존 유지)
      if (level === 'restaurant') {
        const restaurantData = response.data as RestaurantPoint[];
        restaurantData.forEach((item) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(item.latitude, item.longitude),
            map: map,
            icon: {
              content: createRestaurantMarkerHtml(item.price),
              anchor: new window.naver.maps.Point(30, 15),
            },
          });

          // 개별 매장은 클릭 시 상세 페이지 이동
          naver.maps.Event.addListener(marker, 'click', () => {
            navigate(`/detail-info/${item.restaurantId}`);
          });

          markers.current.push(marker);
        });
      }
      // 2. 동 단위 클러스터 (동일 로직 적용)
      else if (level === 'dong') {
        const clusterData = response.data as ClusterPoint[];
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

          // [공통] 클릭 이벤트 핸들러
          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name, size }, restaurantIds);
          });

          markers.current.push(marker);
        });
      }
      // 3. 시/도, 시/군/구 레벨 (동일 로직 적용)
      else {
        const clusterData = response.data as ClusterPoint[];

        if (clusterData.length > 0) {
          // 데이터들의 중심 좌표 계산
          const centerLat =
            clusterData.reduce((acc, cur) => acc + cur.latitude, 0) / clusterData.length;
          const centerLon =
            clusterData.reduce((acc, cur) => acc + cur.longitude, 0) / clusterData.length;
          const count = clusterData.length;
          const size = 35 + count * 1.5;

          // 지역 이름 추출 (라벨용)
          const sample = clusterData[0].address || '';
          const areaName =
            level === 'sigungu'
              ? (sample.match(/([가-힣A-Za-z0-9]+(?:구|군|시))/)?.[1] ?? '선택 지역')
              : (sample.match(/([가-힣]+(?:특별시|광역시|특별자치시|특별자치도|도))/)?.[1] ??
                '선택 지역');

          const restaurantIds = clusterData.map((d) => d.restaurantId);
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            title: areaName,
            icon: {
              content: createClusterMarkerHtml(count, false),
              anchor: new window.naver.maps.Point(size / 2, size / 2), // 기본 앵커
            },
          });

          // [공통] 클릭 이벤트 핸들러 (동 레벨과 동일하게 동작)
          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name: areaName, size }, restaurantIds);
          });

          markers.current.push(marker);
        }
      }
    } catch (error) {
      console.error('지도 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  /**
   * [Refactor] 클러스터 마커 클릭 시 실행되는 공통 로직
   * - 이전 마커 복구
   * - 현재 마커 스타일 변경
   * - 데이터 저장
   * - 부모 이벤트 호출
   */
  const handleClusterMarkerClick = (
    marker: naver.maps.Marker,
    data: { count: number; name: string; size: number },
    restaurantIds: number[]
  ) => {
    // 1. 이전에 선택된 마커가 있다면 -> 저장해둔 데이터(Ref)를 이용해 원래대로 복구
    if (selectedMarkerRef.current && selectedMarkerDataRef.current) {
      const prevMarker = selectedMarkerRef.current;
      const prevData = selectedMarkerDataRef.current;

      // 현재 누른 것과 다른 마커라면 복구 실행
      if (prevMarker !== marker) {
        prevMarker.setIcon({
          content: createClusterMarkerHtml(prevData.count, false),
          anchor: new window.naver.maps.Point(prevData.size / 2, prevData.size / 2),
        });
      }
    }

    // 2. 현재 누른 마커 스타일 변경 (True)
    marker.setIcon({
      content: createClusterMarkerHtml(data.count, true),
      anchor: new window.naver.maps.Point(data.size / 2, data.size / 2),
    });

    // 3. 현재 마커와 데이터를 Ref에 저장 (다음 클릭 때 복구용)
    selectedMarkerRef.current = marker;
    selectedMarkerDataRef.current = data;

    // 4. 부모 컴포넌트(CorkageMap)에 알림 -> 바텀시트 오픈
    if (onClusterClick) {
      onClusterClick(data.name, restaurantIds);
    }
  };

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

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

    naver.maps.Event.once(map, 'init', () => {
      fetchAndDrawMarkers();
    });

    naver.maps.Event.addListener(map, 'dragend', fetchAndDrawMarkers);
    naver.maps.Event.addListener(map, 'zoom_changed', fetchAndDrawMarkers);

    return () => {
      if (map) {
        naver.maps.Event.clearInstanceListeners(map);
      }
    };
  }, []);

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
