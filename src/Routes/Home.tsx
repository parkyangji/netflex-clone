import { useQuery } from "@tanstack/react-query";
import { getMovies, IMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import { useMatch, useNavigate } from "react-router-dom";
import Detail from "../Components/Detail";


function Home() {
  const bigMovieMatch = useMatch("/movies/:movieid");

  const nowPlayings = useQuery({
    queryFn: () => getMovies( {type: "movie", get: "now_playing"} ),
    queryKey: ["movies", "nowPlaying"],
    select(data) : IMovie {
      return data.results[0]
    },
  });

  const history = useNavigate();
  const onBackClick = () => {
    history(-1);
  };

  const onBoxClicked = (movieid: number) => {
    history(`/movies/${movieid}`);
  };

  return (
    <Wrapper>
        {nowPlayings && nowPlayings.data && (
          <Banner $bgphoto={makeImagePath(nowPlayings.data.backdrop_path)}>
          <Title>{nowPlayings.data.title}</Title>
          <Overview>{nowPlayings.data.overview}</Overview>
          <MoreBtn onClick={() => onBoxClicked(nowPlayings.data.id)}>more</MoreBtn>
        </Banner>
        )}

        {/* 영화슬라이더 */}
        <Slider type="movie" get="now_playing" />
        <Slider type="movie" get="popular" />
        <Slider type="movie" get="top_rated" />
        <Slider type="movie" get="upcoming" />

        {/* 팝업 */}
        {bigMovieMatch ? (
          <>
            <Back onClick={onBackClick} />
            <Detail id={bigMovieMatch?.params.movieid} />
          </>
        ) : null}
    </Wrapper>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
`;

const Banner = styled.div<{ $bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgphoto});
  background-size: cover;
`;

const Title = styled.p`
  font-size: 5em;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1.4em;
  line-height: 1.5;
  width: 50%;
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

const Back = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;