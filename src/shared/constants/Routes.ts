// api 요청 header 미포함 prefix
export const PAGE_TO_ANYONE = [
  '/restaurants',
  '/tips',
  '/oauth',
  '/corkages/filter',
  '/reviews/corkageScore',
];

// 하단 네비게이션 visible 여부
export const FOOTERHIDDENURL = ['/my/modify', '/', '/my/contact', '/my/role', '/my/toc'];
export const FOOTERHIDDENPREFIX = ['/onboarding', '/signin', '/master'];

export const FOOTERROUTER = {
  home: ['/home'],
  map: ['/corkagemap'],
  book: ['/reservate'],
  save: ['/keep'],
  mypage: ['/my'],
};
