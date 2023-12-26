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