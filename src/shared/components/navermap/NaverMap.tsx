import { useEffect, useRef, useCallback } from 'react';
//import { useNavigate } from 'react-router-dom';
import { getMapData } from '@/shared/apis/map/mapApi';
import type {
  SavedMapPin,
  SavedMapGroup,
  AggregatedPin,
} from '@/shared/apis/bookmark/bookmark.type';
import { getSavedGroupMapData } from '@/shared/apis/bookmark/bookmark.api';
import { mapColorToIcon } from '@/shared/utils/groupMapper';
import type { MapLevel, MapRestaurantData } from '@/shared/types/map';
import Bottle from './bottle.svg';

import MultiSaveMarker from '@/shared/assets/common/multiSaveMarker.svg';
import SaveMarker1 from '@/pages/corkagemap/list/savemarker/SaveMarker1.svg';
import SaveMarker2 from '@/pages/corkagemap/list/savemarker/SaveMarker2.svg';
import SaveMarker3 from '@/pages/corkagemap/list/savemarker/SaveMarker3.svg';
import SaveMarker4 from '@/pages/corkagemap/list/savemarker/SaveMarker4.svg';
import SaveMarker5 from '@/pages/corkagemap/list/savemarker/SaveMarker5.svg';
import SaveMarker6 from '@/pages/corkagemap/list/savemarker/SaveMarker6.svg';
import SaveMarker7 from '@/pages/corkagemap/list/savemarker/SaveMarker7.svg';
import SaveMarker8 from '@/pages/corkagemap/list/savemarker/SaveMarker8.svg';
import SaveMarker9 from '@/pages/corkagemap/list/savemarker/SaveMarker9.svg';
import SaveMarker10 from '@/pages/corkagemap/list/savemarker/SaveMarker10.svg';
import SaveMarker11 from '@/pages/corkagemap/list/savemarker/SaveMarker11.svg';
import SaveMarker12 from '@/pages/corkagemap/list/savemarker/SaveMarker12.svg';

const saveMarkers: Record<string, string> = {
  SaveMarker1,
  SaveMarker2,
  SaveMarker3,
  SaveMarker4,
  SaveMarker5,
  SaveMarker6,
  SaveMarker7,
  SaveMarker8,
  SaveMarker9,
  SaveMarker10,
  SaveMarker11,
  SaveMarker12,
};

const markerBgColors: Record<string, string> = {
  SaveMarker1: '#90212A',
  SaveMarker2: '#E75257',
  SaveMarker3: '#F3A2AD',
  SaveMarker4: '#C59683',
  SaveMarker5: '#FFEFBA',
  SaveMarker6: '#749755',
  SaveMarker7: '#9CABE2',
  SaveMarker8: '#9188D5',
  SaveMarker9: '#D0A8DD',
  SaveMarker10: '#DCDBE8',
  SaveMarker11: '#FFF',
  SaveMarker12: '#35353F',
  MultiSaveMarker:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), radial-gradient(144.85% 146.88% at -4.43% 75%, #90212A 5.69%, #DCDBE8 86.4%)',
};

const getTextColor = (iconName: string) => {
  // 연노랑(5), 연보라(10), 흰색(11)의 경우 텍스트를 어둡게 표시
  if (['SaveMarker5', 'SaveMarker10', 'SaveMarker11'].includes(iconName)) {
    return '#35353F';
  }
  return '#FFF';
};

interface MarkerData {
  count: number;
  name: string;
  size: number;
}

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

const escapeHtml = (str: string): string => {
  if (!str) return ''; // 빈 문자열이나 null/undefined 처리
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const createRestaurantMarkerHtml = (
  price: string,
  name: string,
  isSelected: boolean = false
): string => {
  const safePrice = escapeHtml(price);
  const safeName = escapeHtml(name);
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
          ${safePrice}
        </div>
        <div style="
          color: #333; font-size: 14px; font-weight: 700; 
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; 
          /* 텍스트 가독성을 위해 흰색 테두리(그림자) 효과 추가 */
        ">
          ${safeName}
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
      ${safePrice}
    </div>
    <div style="
        color: #333; font-size: 14px; font-weight: 700; 
        text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
        margin-top: 4px;
      ">
        ${safeName}
      </div>
      </div>
  `;
};

const createSavedMarkerHtml = (
  price: string,
  iconSrc: string,
  iconName: string,
  isSelected: boolean = false
): string => {
  const safePrice = escapeHtml(price);

  // iconName이 MultiSaveMarker면 통째로 background로 처리, 일반 마커면 background-color로 처리
  const bgStyle =
    iconName === 'MultiSaveMarker'
      ? `background: ${markerBgColors[iconName]};`
      : `background-color: ${markerBgColors[iconName] || '#90212A'};`;

  const textColor = getTextColor(iconName);

  return `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: ${isSelected ? 1000 : 1};">
      <div style="
        padding: 6px 12px; 
        ${bgStyle}
        color: ${textColor}; font-size: 14px; font-weight: bold; border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin-bottom: 4px;
        ${isSelected ? 'border: 2px solid white;' : ''}
      ">
        ${safePrice}
      </div>
      <img src="${iconSrc}" style="width: 32px; height: 32px;" alt="save-marker" />
    </div>
  `;
};

interface NaverMapProps {
  onClusterClick?: (_name: string, _restaurantIds: number[]) => void;
  onRestaurantClick?: (_restaurantId: number) => void;
  isSaveModeView?: boolean;
  selectedGroupColor?: string;
  onMapClick?: () => void;
}

const NaverMap = ({
  onClusterClick,
  onRestaurantClick,
  isSaveModeView,
  selectedGroupColor,
  onMapClick,
}: NaverMapProps) => {
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
    type: 'normal' | 'saved';
    iconSrc?: string;
    iconName?: string;
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
    (
      marker: naver.maps.Marker,
      price: string,
      name: string,
      type: 'normal' | 'saved' = 'normal',
      iconSrc?: string,
      iconName?: string
    ) => {
      const prev = selectedRestaurantRef.current;

      if (prev && prev.marker !== marker) {
        if (prev.type === 'normal') {
          prev.marker.setIcon({
            content: createRestaurantMarkerHtml(prev.price, prev.name, false),
            anchor: new window.naver.maps.Point(30, 15),
          });
        } else {
          prev.marker.setIcon({
            content: createSavedMarkerHtml(prev.price, prev.iconSrc!, prev.iconName!, false),
            anchor: new window.naver.maps.Point(16, 50),
          });
        }
        prev.marker.setZIndex(100);
      }

      if (type === 'normal') {
        marker.setIcon({
          content: createRestaurantMarkerHtml(price, name, true),
          anchor: new window.naver.maps.Point(36, 85),
        });
      } else {
        marker.setIcon({
          content: createSavedMarkerHtml(price, iconSrc!, iconName!, true),
          anchor: new window.naver.maps.Point(16, 50),
        });
      }
      marker.setZIndex(1000);

      selectedRestaurantRef.current = { marker, price, name, type, iconSrc, iconName };
    },
    []
  );

  // [추가] 빈 공간 클릭 시 선택 해제 핸들러
  const handleMapClick = useCallback(() => {
    const prev = selectedRestaurantRef.current;

    if (prev) {
      if (prev.type === 'normal') {
        prev.marker.setIcon({
          content: createRestaurantMarkerHtml(prev.price, prev.name, false),
          anchor: new window.naver.maps.Point(30, 15),
        });
      } else {
        prev.marker.setIcon({
          content: createSavedMarkerHtml(prev.price, prev.iconSrc!, prev.iconName!, false), // <-- 추가됨
          anchor: new window.naver.maps.Point(16, 50),
        });
      }
      prev.marker.setZIndex(100);
      selectedRestaurantRef.current = null;
    }
    if (onMapClick) {
      onMapClick();
    }
  }, [onMapClick]);

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
      if (isSaveModeView) {
        // [수정 1] any 제거: 새 API가 요구하는 파라미터 타입에 맞게 객체 생성
        const savedParams: {
          latMin: number;
          latMax: number;
          lonMin: number;
          lonMax: number;
          color?: string;
        } = {
          latMin: mapParams.latMin,
          latMax: mapParams.latMax,
          lonMin: mapParams.lonMin,
          lonMax: mapParams.lonMax,
        };

        if (selectedGroupColor) {
          savedParams.color = selectedGroupColor;
        }

        const res = await getSavedGroupMapData(savedParams);
        clearMarkers();

        if (!res.data || !res.data.groups) return;

        // [수정 2] any 제거: 식당 ID(number)를 키로, AggregatedPin 타입을 값으로 가지는 Map
        const pinAggregator = new Map<number, AggregatedPin>();

        // [수정 3] any 제거: group과 pin에 API 명세에 맞는 정확한 타입 지정
        res.data.groups.forEach((group: SavedMapGroup) => {
          group.pins.forEach((pin: SavedMapPin) => {
            if (pinAggregator.has(pin.restaurantId)) {
              // 이미 등록된 식당이면 색상만 배열에 추가 (non-null assertion ! 사용)
              pinAggregator.get(pin.restaurantId)!.colors.push(group.color);
            } else {
              // 처음 등록하는 식당이면 핀 정보와 함께 색상 배열 초기화
              pinAggregator.set(pin.restaurantId, { ...pin, colors: [group.color] });
            }
          });
        });

        // 병합된 정보를 바탕으로 마커 그리기
        // [수정 4] any 제거: pinInfo 파라미터에 AggregatedPin 타입 지정
        pinAggregator.forEach((pinInfo: AggregatedPin, restaurantId: number) => {
          let markerSrc = MultiSaveMarker;
          let currentIconName = 'MultiSaveMarker';

          if (pinInfo.colors.length === 1) {
            const iconName = mapColorToIcon(pinInfo.colors[0]); // "COLOR_01" -> "SaveMarker1"
            markerSrc = saveMarkers[iconName] || MultiSaveMarker;
            currentIconName = iconName;
          }

          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(pinInfo.lat, pinInfo.lon),
            map: map,
            icon: {
              content: createSavedMarkerHtml(
                pinInfo.corkagePrice,
                markerSrc,
                currentIconName,
                false
              ),
              anchor: new window.naver.maps.Point(16, 50),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            // API 명세 상 name이 없으므로 빈 문자열, 타입은 'saved'로 전달
            handleRestaurantClick(
              marker,
              pinInfo.corkagePrice,
              '',
              'saved',
              markerSrc,
              currentIconName
            );
            if (onRestaurantClick) {
              onRestaurantClick(restaurantId);
            }
          });

          markers.current.push(marker);
        });

        return; // 저장 모드 로직 완료 후 조기 종료
      }

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
  }, [
    isSaveModeView,
    selectedGroupColor,
    handleClusterMarkerClick,
    handleRestaurantClick,
    onRestaurantClick,
  ]); // 의존성 추가

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

    fetchAndDrawMarkers();
  }, [fetchAndDrawMarkers]);

  // [수정] Effect 3: 지도 이벤트 리스너 전용 (이벤트 함수가 바뀌어도 지도를 다시 그리지 않음!)
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const dragEndListener = naver.maps.Event.addListener(map, 'dragend', fetchAndDrawMarkers);
    const zoomChangedListener = naver.maps.Event.addListener(
      map,
      'zoom_changed',
      fetchAndDrawMarkers
    );
    const mapClickListener = naver.maps.Event.addListener(map, 'click', handleMapClick);

    return () => {
      naver.maps.Event.removeListener(dragEndListener);
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(mapClickListener);
    };
  }, [fetchAndDrawMarkers, handleMapClick]);

  return <div ref={mapRef} id="map" className="h-[100vh] w-full" />;
};

export default NaverMap;
