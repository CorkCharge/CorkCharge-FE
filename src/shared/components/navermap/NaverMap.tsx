import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMapData } from '@/shared/apis/map/mapApi';
import type { MapLevel, ClusterPoint, RestaurantPoint } from '@/shared/types/map';

/* =========================
   NEW: 유틸 함수 (동명 파싱/그룹핑)
   ========================= */
// 주소의 마지막 괄호(...)에서 "동/읍/면/리"로 끝나는 토큰 추출
const getDongFromAddress = (address: string): string | null => {
  // 예: "서울특별시 광진구 자양로 199-1 (구의동)"
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

const NaverMap = () => {
  // 지도를 담을 DOM 요소를 참조
  const mapRef = useRef<HTMLDivElement | null>(null);
  // 생성된 네이버 맵 인스턴스를 저장, 불필요한 리렌더링을 막기 위해 ref를 사용
  const mapInstance = useRef<naver.maps.Map | null>(null);
  // 현재 지도에 표시된 마커들을 저장
  const markers = useRef<naver.maps.Marker[]>([]);
  const navigate = useNavigate();

  /**
   * 줌 레벨에 따라 API 요청에 사용할 'level' 문자열을 반환
   * @param zoom - 현재 지도의 줌 레벨
   */
  const getMapLevel = (zoom: number): MapLevel => {
    if (zoom >= 17) return 'restaurant';
    if (zoom >= 14) return 'dong';
    if (zoom >= 11) return 'sigungu';
    return 'sido';
  };

  /**
   * 클러스터 마커(원)의 HTML 문자열을 생성
   * @param count - 클러스터에 포함된 매장 수
   * @param label - (선택) 동 이름 라벨
   */
  const createClusterMarkerHtml = (count: number, label?: string): string => {
    // 매장 수에 비례하여 원의 크기를 조절
    const size = 35 + count * 1.5;
    return `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:${size}px;
        height:${size}px;
        background-color:#90212A;
        color:white;
        font-size:12px;
        font-weight:bold;
        border-radius:50%;
        box-shadow:0 2px 4px rgba(0,0,0,0.2);
        transition:all 0.2s;
        padding:4px;
      ">
        <div style="font-size:14px; line-height:1">${count}</div>
        ${label ? `<div style="font-size:10px; margin-top:2px; white-space:nowrap">${label}</div>` : ''}
      </div>
    `;
  };

  /**
   * 개별 매장 마커(가격)의 HTML 문자열을 생성.
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
   * 이전에 생성된 모든 마커를 지도에서 제거
   */
  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
  };

  /**
   * 지도 상태(줌, 위치)가 변경될 때마다 API를 호출하여 마커를 다시 생성
   */
  const fetchAndDrawMarkers = async () => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;
    const rawBounds = map.getBounds();

    // NEW: 타입 가드 + 숫자 전용 API 사용 (south/north/west/east)
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

          naver.maps.Event.addListener(marker, 'click', () => {
            navigate(`/detailInfo/${item.restaurantId}`);
          });

          markers.current.push(marker);
        });
      } else if (level === 'dong') {
        // NEW: 동 단위로 그룹핑하여 동의 중심에 클러스터 마커 여러 개 생성
        const clusterData = response.data as ClusterPoint[];
        console.log(clusterData.map((d) => d.restaurantId)); // 주소 배열 확인용

        const dongClusters = groupByDong(clusterData);

        dongClusters.forEach(({ name, count, centerLat, centerLon, restaurantIds }) => {
          const size = 35 + count * 1.5;
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            icon: {
              content: createClusterMarkerHtml(count), // 라벨: 동 이름
              anchor: new window.naver.maps.Point(size / 2, size / 2),
            },
          });

          // 선택: 클릭 시 해당 동으로 살짝 확대/이동
          naver.maps.Event.addListener(marker, 'click', () => {
            console.log('dong marker clicked', { name, restaurantIds });
            navigate('/corkagemap/list', {
              state: { level: 'dong' as MapLevel, areaName: name, restaurantIds },
            });
          });

          markers.current.push(marker);
        });
      } else {
        // 기존: 시군구/시도는 전체 묶음 1개만
        const clusterData = response.data as ClusterPoint[];
        if (clusterData.length > 0) {
          const centerLat =
            clusterData.reduce((acc, cur) => acc + cur.latitude, 0) / clusterData.length;
          const centerLon =
            clusterData.reduce((acc, cur) => acc + cur.longitude, 0) / clusterData.length;
          const ids = clusterData.map((d) => d.restaurantId);
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            icon: {
              content: createClusterMarkerHtml(clusterData.length),
              anchor: new window.naver.maps.Point(15, 15), // 마커의 기준점 조정
            },
          });

          // 간단 파싱: 주소에서 시/도 or 구/군 이름 하나 뽑기 (첫 항목 기준)
          const sample = clusterData[0].address || '';
          const areaName =
            level === 'sigungu'
              ? (sample.match(/([가-힣A-Za-z0-9]+(?:구|군|시))/)?.[1] ?? '선택 지역')
              : (sample.match(/([가-힣]+(?:특별시|광역시|특별자치시|특별자치도|도))/)?.[1] ??
                '선택 지역');

          naver.maps.Event.addListener(marker, 'click', () => {
            navigate('/corkagemap/list', {
              state: { level, areaName, restaurantIds: ids },
            });
          });

          markers.current.push(marker);
        }
      }
    } catch (error) {
      console.error('지도 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 지도를 초기화
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
      zoomControl: false,
    });

    mapInstance.current = map;

    // 지도 로드 완료 후 첫 데이터 로딩
    naver.maps.Event.once(map, 'init', () => {
      fetchAndDrawMarkers();
    });

    // 지도 드래그가 끝나거나 줌이 변경될 때마다 마커를 다시 그리도록 이벤트 리스너를 등록
    naver.maps.Event.addListener(map, 'dragend', fetchAndDrawMarkers);
    naver.maps.Event.addListener(map, 'zoom_changed', fetchAndDrawMarkers);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      if (map) {
        naver.maps.Event.clearInstanceListeners(map);
      }
    };
  }, []); // 의존성 배열 추가

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
