const API_KEY = "22602a6b48ee1370cf81bb1232481090";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

// fetch는 데이터를 받아오고 json을 리턴하는 함수
/*
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
*/
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjYwMmE2YjQ4ZWUxMzcwY2Y4MWJiMTIzMjQ4MTA5MCIsInN1YiI6IjY1NGNiZjM4NDFhNTYxMzM2ODg2NTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7S2Kk5fELxQWLtV7aNYdrqTHbm3nK7qWgw8V-o4Jro0'
  }
};

export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?language=ko-KR&page=1`, options).then(
    response => response.json()
    )
}