import { useQuery } from "@tanstack/react-query";
import {IGet, IGetMoviesResult, detailMovie, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath, movieSliderTitle } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const rowVariants = {
  hidden: (left : boolean) => ({
    x: left ? -window.innerWidth : window.innerWidth, //window.outerWidth
  }),
  visible: {
    x: 0,
  },
  exit: (left : boolean) => ({
    x: left ? window.innerWidth : -window.innerWidth,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -30,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.7,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6; // 한번에 보여주고 싶은 영화 수


function Slider( {type, get} : IGet){

  const { data } = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies({type, get}),
    queryKey: [type, get],
  });
  

  const [index, setIndex] = useState(0);
  const [derectionLeft, setDerection] = useState(false);
  const toggleLeving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeving();
      setDerection(false);

      const totalMovies = data.results.length - 1; // 배너영화 -1
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 0으로 시작하기때문에 -1 해줘야함 (나눗셈하면 1)
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeving();
      setDerection(true);

      const totalMovies = data.results.length - 1; // 배너영화 -1
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 0으로 시작하기때문에 -1 해줘야함 (나눗셈하면 1)
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  //console.log(index)

  const history = useNavigate(); // url을 왔다갔다
  const onBoxClicked = (movieid: number) => {
    history(`/movies/${movieid}`);
  };
  return (
    <SliderWrap >
        <SliderTitle>{movieSliderTitle(get)}</SliderTitle>
        <AnimatePresence custom={derectionLeft} initial={false} onExitComplete={toggleLeving}>
          <Row
            custom={derectionLeft}
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
                  onClick={() => onBoxClicked(movie.id)}
                  key={movie.id}
                  $bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{type : "tween"}}
                >
                  <Info variants={infoVariants}>
                    <span>{movie.title}</span>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <RightButton onClick={incraseIndex}></RightButton>
        <LeftButton onClick={decreaseIndex}></LeftButton>
    </SliderWrap>
  )
}

export default Slider;


const SliderWrap = styled.div`
  height: 20vw;
  max-height: 280px;
  position: relative;
  top: -6rem;
  margin: 1vw;
  margin-left: 3vw;
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
  height: 15vw;
  max-height: 200px;
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
  text-align: center;
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  span {
    text-align: center;
    font-size: 1em;
  }
`;

const LeftButton = styled.button`
  position: absolute;
  left: -3vw;
  top: 0;
  z-index: 5;
  width: 3vw;
  height: 100%;
  background: transparent;
  border: none;
`

const RightButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
  width: 3vw;
  height: 100%;
  background: transparent;
  border: none;
`

