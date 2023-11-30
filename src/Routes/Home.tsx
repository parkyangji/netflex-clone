import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import { useMatch, useNavigate } from "react-router-dom";
import Detail from "../Components/Detail";


function Home() {
  const bigMovieMatch = useMatch("/movies/:movieid");

  const nowPlayings = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies( {type: "movie", get: "now_playing"} ),
    queryKey: ["movies", "nowPlaying"],
  });

  const history = useNavigate();
  const onBackClick = () => {
    history(-1);
  };

  return (
    <Wrapper>
        <Banner
          $bgphoto={makeImagePath(nowPlayings.data?.results[0].backdrop_path || "")}
        >
          <Title>{nowPlayings.data?.results[0].title}</Title>
          <Overview>{nowPlayings.data?.results[0].overview}</Overview>
        </Banner>

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

const Back = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;



// const BigMoive = styled(motion.div)`
//   position: fixed;
//   width: 50vw;
//   height: 50vh;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   margin: auto;
//   border-radius: 15px;
//   overflow: hidden;
//   background: linear-gradient(180deg, rgba(89,7,5,1) 40%, rgba(140,45,45,1) 100%);
// `;

// const BigPoster = styled.img`
//   float: left;
//   margin: 2rem;
// `

// const BigTitle = styled.span`
//   display: block;
//   color: ${(props) => props.theme.white.lighter};
//   padding: 1em;
//   font-size: 1.5em;
// `;

// const BigOverview = styled.p`
//   padding: 1em;
//   color: ${(props) => props.theme.white.lighter};
// `