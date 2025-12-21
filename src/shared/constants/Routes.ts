// api 요청 중 header를 미포함하는 page url prefix
export const PAGE_TO_ANYONE = [
  '/restaurants',
  '/tips',
  '/oauth',
  '/corkages/filter',
  '/reviews/corkageScore',
];

// 하단 네비게이션 숨김 page URL(전체)
export const FOOTERHIDDENURL = [
  '/my/modify',
  '/',
  '/my/contact',
  '/my/role',
  '/my/toc',
  '/corkagemap/filter',
  '/doit',
];

// 하단 네비게이션 숨김 page URL(prefix)
export const FOOTERHIDDENPREFIX = ['/onboarding', '/signin', '/master', '/notification'];

// 하단 네비게이션의 각 아이템의 이동 링크 설정
export const FOOTERROUTER = {
  home: ['/home'],
  map: ['/corkagemap'],
  book: ['/reservate'],
  save: ['/keep'],
  mypage: ['/my'],
};
