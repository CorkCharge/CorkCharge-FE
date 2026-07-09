import { useEffect, useRef, useCallback } from 'react';
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

/* =========================
   유틸 함수 (동 단위 & 구 단위 분리)
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

// [NEW] 구 단위 추출 로직
const getSigunguFromAddress = (address: string): string | null => {
  if (!address) return null;
  const parts = address.split(/\s+/);
  const candidates = parts.filter(
    (t) => /(구|군|시)$/.test(t) && !/(특별시|광역시|특별자치시|도)$/.test(t)
  );
  if (candidates.length > 0) return candidates[candidates.length - 1];
  const city = parts.find((t) => /(특별시|광역시|특별자치시)$/.test(t));
  return city || '기타';
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
      map.set(dong, { name: dong, count: 1, sumLat: p.lat, sumLon: p.lon, ids: [p.restaurantId] });
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

// [NEW] 구 단위 그룹화 로직
const groupBySigungu = (points: MapRestaurantData[]) => {
  const map = new Map<string, DongBucket>();
  for (const p of points) {
    const parsed = getSigunguFromAddress(p.address);
    const sigungu = parsed ?? '기타';
    const b = map.get(sigungu);
    if (b) {
      b.count += 1;
      b.sumLat += p.lat;
      b.sumLon += p.lon;
      b.ids.push(p.restaurantId);
    } else {
      map.set(sigungu, {
        name: sigungu,
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

// [NEW] 최대 크기를 제한하는 헬퍼 함수
const getClusterSize = (count: number) => {
  const displayCountForSize = Math.min(count, 30); // 30개를 초과해도 크기는 고정
  return 35 + displayCountForSize * 1.5;
};

const createClusterMarkerHtml = (
  count: number,
  size: number,
  isSelected: boolean = false
): string => {
  const activeBackground = `
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), 
                radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%);
  `;
  const defaultBackground = `background-color: #90212A;`;
  const displayCount = count > 999 ? '999+' : count;

  return `
    <div style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      width:${size}px; height:${size}px;
      ${isSelected ? activeBackground : defaultBackground}
      color:white; font-size:12px; font-weight:bold; border-radius:50%;
      box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:all 0.2s; padding:4px; cursor: pointer;
    ">
      <div style="font-size:14px; line-height:1">${displayCount}</div>
    </div>
  `;
};

const escapeHtml = (str: string): string => {
  if (!str) return '';
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
    return `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="
          width: 72px; height: 72px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
          border: 2px solid #FFF; background: radial-gradient(151% 149.45% at -10.81% 68.19%, #90212A 0%, #DCDBE8 70.67%);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;
          margin-bottom: 8px; z-index: 1000;
        ">
          <img src="${Bottle}" style="width: 24px; height: 48px; transform: rotate(45deg);" alt="bottle" />
        </div>
        <div style="
          padding: 8px 12px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), 
                      radial-gradient(191.49% 164.27% at -1.8% 88.07%, #90212A 32.79%, #DCDBE8 86.4%);
          color: white; font-size: 14px; font-weight: bold; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;
        ">${safePrice}</div>
        <div style="color: #333; font-size: 14px; font-weight: 700; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;">
          ${safeName}
        </div>
      </div>
    `;
  }
  return `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="padding: 12px; background-color: #90212A; color: white; font-size: 14px; font-weight: bold; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">
      ${safePrice}
    </div>
    <div style="color: #333; font-size: 14px; font-weight: 700; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; margin-top: 4px;">
        ${safeName}
      </div>
  </div>`;
};

const createSavedMarkerHtml = (
  price: string,
  iconSrc: string,
  iconName: string,
  isSelected: boolean = false
): string => {
  const safePrice = escapeHtml(price);
  const bgStyle =
    iconName === 'MultiSaveMarker'
      ? `background: ${markerBgColors[iconName]};`
      : `background-color: ${markerBgColors[iconName] || '#90212A'};`;
  const textColor = getTextColor(iconName);

  return `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: ${isSelected ? 1000 : 1};">
      <div style="padding: 6px 12px; ${bgStyle} color: ${textColor}; font-size: 14px; font-weight: bold; border-radius: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin-bottom: 4px; ${isSelected ? 'border: 2px solid white;' : ''}">
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

  const selectedMarkerRef = useRef<naver.maps.Marker | null>(null);
  const selectedMarkerDataRef = useRef<MarkerData | null>(null);

  // [NEW] API 캐싱을 위한 Ref (요구사항 1) - any 없이 엄격한 타입 유지
  const lastFetchInfo = useRef<{ bounds: naver.maps.LatLngBounds; zoom: number } | null>(null);

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
          content: createSavedMarkerHtml(prev.price, prev.iconSrc!, prev.iconName!, false),
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

  const handleClusterMarkerClick = useCallback(
    (marker: naver.maps.Marker, data: MarkerData, restaurantIds: number[]) => {
      const prevMarker = selectedMarkerRef.current;
      const prevData = selectedMarkerDataRef.current;

      if (prevMarker && prevData && prevMarker !== marker) {
        prevMarker.setIcon({
          content: createClusterMarkerHtml(prevData.count, prevData.size, false),
          anchor: new window.naver.maps.Point(prevData.size / 2, prevData.size / 2),
        });
      }

      marker.setIcon({
        content: createClusterMarkerHtml(data.count, data.size, true),
        anchor: new window.naver.maps.Point(data.size / 2, data.size / 2),
      });

      selectedMarkerRef.current = marker;
      selectedMarkerDataRef.current = data;

      if (onClusterClick) {
        onClusterClick(data.name, restaurantIds);
      }
    },
    [onClusterClick]
  );

  const fetchAndDrawMarkers = useCallback(async () => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    const rawBounds = map.getBounds();

    if (!(rawBounds instanceof naver.maps.LatLngBounds)) return;

    const zoom = map.getZoom();
    const level = getMapLevel(zoom);

    // [NEW] 캐싱 검사: 화면이 넓은 버퍼 안에 완전히 들어가 있고, 줌 레벨이 같다면 API 스킵
    if (isSaveModeView) {
      lastFetchInfo.current = null;
    } else if (
      lastFetchInfo.current &&
      lastFetchInfo.current.zoom === zoom &&
      lastFetchInfo.current.bounds.hasBounds(rawBounds)
    ) {
      return;
    }

    // [NEW] 현재 화면보다 상하좌우 1.5배 넓은 버퍼 영역 계산
    const latDiff = rawBounds.north() - rawBounds.south();
    const lonDiff = rawBounds.east() - rawBounds.west();

    const expandedBounds = new window.naver.maps.LatLngBounds(
      new window.naver.maps.LatLng(
        rawBounds.south() - latDiff * 0.5,
        rawBounds.west() - lonDiff * 0.5
      ),
      new window.naver.maps.LatLng(
        rawBounds.north() + latDiff * 0.5,
        rawBounds.east() + lonDiff * 0.5
      )
    );

    // API 요청용 파라미터는 확장된 버퍼 영역으로 설정
    const requestParams = {
      latMin: expandedBounds.south(),
      latMax: expandedBounds.north(),
      lonMin: expandedBounds.west(),
      lonMax: expandedBounds.east(),
    };

    console.log('[NaverMap] 캐시 미스! 넓은 영역으로 새로 요청:', requestParams);

    try {
      if (isSaveModeView) {
        const savedParams: {
          latMin: number;
          latMax: number;
          lonMin: number;
          lonMax: number;
          color?: string;
        } = {
          latMin: requestParams.latMin,
          latMax: requestParams.latMax,
          lonMin: requestParams.lonMin,
          lonMax: requestParams.lonMax,
        };

        if (selectedGroupColor) {
          savedParams.color = selectedGroupColor;
        }

        const res = await getSavedGroupMapData(savedParams);
        clearMarkers();

        if (!res.data || !res.data.groups) return;

        const pinAggregator = new Map<number, AggregatedPin>();

        res.data.groups.forEach((group: SavedMapGroup) => {
          group.pins.forEach((pin: SavedMapPin) => {
            if (pinAggregator.has(pin.restaurantId)) {
              pinAggregator.get(pin.restaurantId)!.colors.push(group.color);
            } else {
              pinAggregator.set(pin.restaurantId, { ...pin, colors: [group.color] });
            }
          });
        });

        pinAggregator.forEach((pinInfo: AggregatedPin, restaurantId: number) => {
          let markerSrc = MultiSaveMarker;
          let currentIconName = 'MultiSaveMarker';

          if (pinInfo.colors.length === 1) {
            const iconName = mapColorToIcon(pinInfo.colors[0]);
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

        return;
      }

      const response = await getMapData(requestParams);
      lastFetchInfo.current = { bounds: expandedBounds, zoom };
      clearMarkers();

      // 1. 개별 매장 (Zoom >= 17)
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

          naver.maps.Event.addListener(marker, 'click', () => {
            handleRestaurantClick(marker, item.corkagePrice, item.restaurantName);
            if (onRestaurantClick) {
              onRestaurantClick(item.restaurantId);
            }
          });

          markers.current.push(marker);
        });
      }
      // 2. 동 단위 클러스터 (14 <= Zoom < 17)
      else if (level === 'dong') {
        const clusterData = response.data as MapRestaurantData[];
        const dongClusters = groupByDong(clusterData);

        dongClusters.forEach(({ name, count, centerLat, centerLon, restaurantIds }) => {
          const size = getClusterSize(count);
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            title: name,
            icon: {
              content: createClusterMarkerHtml(count, size, false),
              anchor: new window.naver.maps.Point(size / 2, size / 2),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name, size }, restaurantIds);
          });

          markers.current.push(marker);
        });
      }
      // 3. 구 단위 클러스터 (Zoom < 14) - [NEW] 여러 개의 구로 쪼개기
      else {
        const restaurantData = response.data as MapRestaurantData[];
        const sigunguClusters = groupBySigungu(restaurantData);

        sigunguClusters.forEach(({ name, count, centerLat, centerLon, restaurantIds }) => {
          const size = getClusterSize(count);
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(centerLat, centerLon),
            map: map,
            clickable: true,
            title: name,
            icon: {
              content: createClusterMarkerHtml(count, size, false),
              anchor: new window.naver.maps.Point(size / 2, size / 2),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            handleClusterMarkerClick(marker, { count, name, size }, restaurantIds);
          });

          markers.current.push(marker);
        });
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
  ]);

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

  // Effect 2: 초기 API 호출
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    fetchAndDrawMarkers();
  }, [fetchAndDrawMarkers]);

  // Effect 3: 지도 드래그 및 줌 이벤트 감지
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
