import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IGetMoviesResult, IMovie, searchMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";


function Search(){
  const {state} = useLocation(); // 현재 주소
  //console.log(state.key)
  const {data, isLoading, isError} = useQuery<IGetMoviesResult>({
    queryFn: () => searchMovie(state.key),
    queryKey: ['search', state.key],
    // select(data) : number[] {
    //   return data.results.map((result : IMovie) => result.id)
    // },
  })

  if (isLoading) return null;
  if (isError) return null;

  return (
    <SearchWrap>
      {data && data.results.map((result) => (
        <Item key={result.id}>
          <img src={makeImagePath(result.backdrop_path, "w300_and_h450_bestv2")} alt="" />
        </Item>
      ))}
    </SearchWrap>
  )
}

export default Search;

const SearchWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2vw;
  padding: 2vw;
  margin-top: 65px;
`

const Item = styled.div`

`