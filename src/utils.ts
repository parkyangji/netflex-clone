export function makeImagePath(id:string, format?:string) {
  if (id === null) return ``
  return `https://image.tmdb.org/t/p/${format?format:"original"}/${id}`;
}

export function movieSliderTitle(get :string) {
  if (get === "now_playing") return "현재상영작"
  if (get === "popular") return "인기 있는"
  if (get === "top_rated") return "평점 높은"
  if (get === "upcoming") return "개봉예정작"
}

// https://velog.io/@sunohvoiin/ReactCSS-모달창이-열려있을-때-body-스크롤-방지하기
/**
 * 스크롤을 방지하고 현재 위치를 반환한다.
 * @returns {number} 현재 스크롤 위치
 */
export const preventScroll = () => {
  const currentScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
  document.body.style.overflowY = 'scroll';
  return currentScrollY;
};

/**
 * 스크롤을 허용하고, 스크롤 방지 함수에서 반환된 위치로 이동한다.
 * @param prevScrollY 스크롤 방지 함수에서 반환된 스크롤 위치
 */
export const allowScroll = (prevScrollY: number) => {
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, prevScrollY);
};