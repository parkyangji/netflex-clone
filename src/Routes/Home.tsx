import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, detailMovie, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

const offset = 6; // 한번에 보여주고 싶은 영화 수

function Home() {
  const history = useNavigate(); // url을 왔다갔다
  const bigMovieMatch = useMatch("/movies/:movieid");

  const nowPlayings = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies(),
    queryKey: ["movies", "nowPlaying"],
  });

  /*
  const clicedMovie =
    bigMovieMatch?.params.movieid &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieid!); // ! 항상 존재한다
  */
  // const details = useQuery({
  //   queryFn: () => detailMovie(Number(bigMovieMatch?.params.movieid)),
  //   queryKey: ["details"],
  // });

  // useEffect(() => {
  //  // console.log(details.data);
  // }, [bigMovieMatch]);
  
  const [index, setIndex] = useState(0);
  const incraseIndex = () => {
    if (nowPlayings.data) {
      if (leaving) return;
      toggleLeving();

      const totalMovies = nowPlayings.data.results.length - 1; // 배너영화 -1
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 0으로 시작하기때문에 -1 해줘야함 (나눗셈하면 1)
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);

  const onBoxClicked = (movieid: number) => {
    history(`/movies/${movieid}`);
  };
  const onBackClick = () => history(-1);

  return (
    <Wrapper>
      {nowPlayings.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            $bgphoto={makeImagePath(nowPlayings.data?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlayings.data?.results[0].title}</Title>
            <Overview>{nowPlayings.data?.results[0].overview}</Overview>
          </Banner>
          {/* 영화슬라이더 */}
          <Slider>
            <SliderTitle>Now Playing</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {nowPlayings.data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      $bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info>
                        <span>{movie.title}</span>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          {/* 팝업 */}
          {/* {bigMovieMatch ? (
            <>
              <Back
                onClick={onBackClick}
              />
                {clicedMovie && (
                    <BigMoive>
                      <BigPoster src={makeImagePath(clicedMovie.poster_path, "w200")} alt="" />
                      <BigTitle>{clicedMovie.title}</BigTitle>
                      <BigOverview>{clicedMovie.overview}</BigOverview>
                    </BigMoive>
                )}
            </>
          ) : null} */}
         
        </>
      )}
    </Wrapper>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Slider = styled.div`
  position: relative;
  top:-100px;
  margin: 1rem;
  margin-left: 3rem;
`;

const SliderTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 1rem;
`

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgphoto: string }>`
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 1em;
  &:last-child {
    transform-origin: center right;
  }
  &:first-child {
    transform-origin: center left;
  }
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 1em;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  span {
    text-align: center;
    font-size: 1em;
  }
`;

const BigMoive = styled(motion.div)`
  position: fixed;
  width: 50vw;
  height: 50vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(89,7,5,1) 40%, rgba(140,45,45,1) 100%);
`;

const Back = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigPoster = styled.img`
  float: left;
  margin: 2rem;
`

const BigTitle = styled.span`
  display: block;
  color: ${(props) => props.theme.white.lighter};
  padding: 1em;
  font-size: 1.5em;
`;

const BigOverview = styled.p`
  padding: 1em;
  color: ${(props) => props.theme.white.lighter};
`