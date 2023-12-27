import { useQuery } from "@tanstack/react-query";
import { getMovies, IMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";

function MainVisual(){

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getMovies( {type: "movie", get: "now_playing"} ),
    queryKey: ["movies", "nowPlaying"],
    select(data) : IMovie {
      return data.results[0]
    },
  });

  const history = useNavigate();
  const onBoxClicked = (movieid: number) => {
    history(`/movies/${movieid}`);
  };

  return (<>
    {data && (
      <Banner $bgphoto={makeImagePath(data.backdrop_path)}>
        <Title>{data.title}</Title>
        <Overview>{data.overview}</Overview>
        <MoreBtn onClick={() => onBoxClicked(data.id)}>more</MoreBtn>
      </Banner>
    )}
  </>)
}

export default MainVisual;

const Banner = styled.div<{ $bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgphoto});
  background-size: cover;

    @media ${(props) => props.theme.tablet} {
      padding-top: 14em;
    }
    @media ${(props) => props.theme.mobile} {
      padding-top: initial;
    }
`;

const Title = styled.p`
  font-size: 5em;
  margin-bottom: 1rem;

    @media ${(props) => props.theme.tablet} {
      font-size: 3.5em;
    }
`;

const Overview = styled.p`
  font-size: 1.4em;
  line-height: 1.5;
  width: 50%;

    @media ${(props) => props.theme.tablet} {
      width: 80%;
      font-size: 1.2em;
    }
`;

const MoreBtn = styled.button`
  cursor: pointer;
  width: 150px;
  background: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 10px;
  margin-top: 2em;
  padding: 10px;
  font-size: 1em;
  color: ${(props) => props.theme.white.lighter};
`