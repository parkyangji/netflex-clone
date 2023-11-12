import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -40,
    transition: {
      delay: 0.3,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6; // 한번에 보여주고 싶은 영화 수

function Home() {
  const history = useNavigate(); // url을 왔다갔다
  const bigMovieMatch = useMatch("/movies/:movieid");

  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies(),
    queryKey: ["movies", "nowPlaying"],
  });
  const [index, setIndex] = useState(0);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeving();

      const totalMovies = data.results.length - 1; // 배너영화 -1
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
  const clicedMovie =
    bigMovieMatch?.params.movieid &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieid!); // ! 항상 존재한다

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            $bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      $bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Back
                  onClick={onBackClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMoive layoutId={bigMovieMatch.params.movieid + ""}>
                  {clicedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(transparent, black) ,
                            url(${makeImagePath(clicedMovie.backdrop_path, "w500")})`,
                        }}
                      />
                      <BigTitle>{clicedMovie.title}</BigTitle>
                      <BigOverview>{clicedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMoive>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
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

const Title = styled.h2`
  font-size: 5em;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.5em;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

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
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
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
  h4 {
    text-align: center;
    font-size: 1em;
  }
`;

const BigMoive = styled(motion.div)`
  position: fixed;
  width: 40vw;
  /* height: 80vh; */
  top: 30%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const Back = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigCover = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 1em;
  font-size: 1.5em;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 1em;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -60px;
`