const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids : [];
}
  
export interface IGetMoviesResult {
  dates: {
  maximum: string;
  minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetDetailsResult {
  adult : boolean
  backdrop_path : string; 
  belongs_to_collection : {};
  budget : number;
  genres : [{id : number, name: string}];
  homepage : string;
  id : number;
  imdb_id : string;
  original_language : string;
  original_title : string;
  overview : string;
  popularity : number;
  poster_path : string;
  production_companies : [];
  production_countries : [];
  release_date : string;
  revenue : number;
  runtime : number;
  spoken_languages : [];
  status : string;
  tagline : string;
  title : string;
  video : boolean;
  vote_average : number;
  vote_count : number;
}

// fetch는 데이터를 받아오고 json을 리턴하는 함수
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjYwMmE2YjQ4ZWUxMzcwY2Y4MWJiMTIzMjQ4MTA5MCIsInN1YiI6IjY1NGNiZjM4NDFhNTYxMzM2ODg2NTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7S2Kk5fELxQWLtV7aNYdrqTHbm3nK7qWgw8V-o4Jro0'
  }
};

export interface IGet {
  type : string;
  get : string;
}

export function getMovies({type, get}: IGet){
  return fetch(`${BASE_PATH}/${type}/${get}?language=ko-KR&page=1`, options)
  .then(response => response.json())
}

export function detailMovie(id :number){ 
  return fetch(`${BASE_PATH}/movie/${id}?language=ko-KR'`, options)
  .then(response => response.json())
}

export function castMovie(id :number){
  return fetch(`${BASE_PATH}/movie/${id}/credits?language=ko-KR`, options)
  .then(response => response.json())
}