import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, searchMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { isMobileCheck, isPcCheck, isTabletCheck } from "../theme";
import Detail from "./Detail";
import MobileDetail from "./MobileDetail";
import { useMatch, useNavigate } from "react-router-dom";

interface Ikeyword {
  keyword : string | undefined;
}

function SearchResult({keyword} : Ikeyword ){

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryFn: () => searchMovie(keyword),
    queryKey: ["search", keyword],
    // select(data) : number[] {
    //   return data.results.map((result : IMovie) => result.id)
    // },
  });
  const history = useNavigate(); // url을 왔다갔다
  const onSetClick = (movieid : number) => {
    history(`/search/${movieid}`, {state: {key : keyword}});
  }

  if (isLoading) return null;
  if (isError) return null;

  return (
    <SearchWrap>
      {data &&
        data.results.map((result) => (
          <Item 
            key={result.id}
            onClick={()=>onSetClick(result.id)}
          >
            {result.poster_path ? (
              <img
                src={makeImagePath(result.poster_path, "w300_and_h450_bestv2")}
                alt=""
              />
            ) : (
              <EmptyImg>No Image</EmptyImg>
            )}
          </Item>
        ))}
    </SearchWrap>
  )
}

export default SearchResult;


const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(230px, auto));
  gap: 2vw;
  padding: 2vw;

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(3, minmax(230px, auto));
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Item = styled.div`
  img {
    width: 100%;
  }
`;

const EmptyImg = styled.div`
  width: 100%;
  height: 100%;
  min-width: 230px;
  min-height: 345px;
  background: rgba(126, 124, 124, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
`;