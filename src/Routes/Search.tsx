import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IGetMoviesResult, IMovie, searchMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useState } from "react";
import Detail from "../Components/Detail";

function Search() {
  const { state } = useLocation(); // 현재 주소
  //console.log(state.key)
  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryFn: () => searchMovie(state.key),
    queryKey: ["search", state.key],
    // select(data) : number[] {
    //   return data.results.map((result : IMovie) => result.id)
    // },
  });

  const [ID, setID] = useState<null | string>(null);
  const onSetClick = (movieid : number) => {
    setID(movieid+"")
  }
  const onBackClick = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setID(null);
  }

  if (isLoading) return null;
  if (isError) return null;

  return (
    <>
      <SearchInfo>"{state.key}" 에 대한 검색결과</SearchInfo>
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

      { ID ? (
        <>
          <Back onClick={onBackClick} />
          <Detail id={ID} />
        </>
      ) : null}
    </>
  );
}

export default Search;

const SearchInfo = styled.div`
  margin-top: 85px;
  //margin-top: 65px;
  margin-bottom: 40px;
  font-size: 3em;
  text-align: center;
`

const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(230px, auto));
  gap: 2vw;
  padding: 2vw;

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(3, minmax(230px, auto));
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

const Back = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;