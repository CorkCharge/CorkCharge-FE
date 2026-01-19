// export const TIP_CATEGORY_OPTIONS = [
//   { value: 'CORKAGE' as const, label: '콜키지 팁' },
//   { value: 'PAIRING' as const, label: '페어링 큐레이션' },
//   { value: 'EVENT' as const, label: '일주일' },
// ];

export type tipCategory = 'CORKAGE' | 'PAIRING' | 'EVENT';
export type Selected = 'ALL' | tipCategory;

export const TIP_CATEGORY_MAP: Record<tipCategory, string> = {
  CORKAGE: '콜키지 팁',
  PAIRING: '페어링 큐레이션',
  EVENT: '이벤트',
};
