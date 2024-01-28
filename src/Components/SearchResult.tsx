import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, searchMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";


function SearchResult(){
  const { state } = useLocation();
  const history = useNavigate(); // url을 왔다갔다

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryFn: () => searchMovie(state.key),
    queryKey: ["search", state.key],
    // select(data) : number[] {
    //   return data.results.map((result : IMovie) => result.id)
    // },
  });

  const onSetClick = (movieid : number) => {
    history(`/search?keyword=${state.key}&movieid=${movieid}`, {state: {key : state.key, id : movieid}});
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
                src={makeImagePath(result.poster_path)}
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