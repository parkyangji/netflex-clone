import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies(),
    queryKey: ["movies", "nowPlaying"],
  });
  const [index, setIndex] = useState(0);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeving();

      const totalMovies = data.results.length - 1;  // 배너영화 -1
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 0으로 시작하기때문에 -1 해줘야함 (나눗셈하면 1)
      setIndex((prev) => (prev === maxIndex ) ? 0 : prev + 1);
    }
  };
  const toggleLeving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
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
                    <Box key={movie.id} bgphoto={makeImagePath(movie.backdrop_path, "w500")}></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
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

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
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

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 1em;
`;
