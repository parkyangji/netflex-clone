import { useQuery } from "@tanstack/react-query";
import {IGet, IGetMoviesResult , getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath, movieSliderTitle } from "../utils";
import { AnimatePresence, delay, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx"
import { isMobileCheck, isPcCheck, isTabletCheck } from "../theme";

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
    zIndex: 5,
    scale: 1.1,
    y: -30,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  }
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

const arrowLeft = {
  normal: {
    opacity: 0,
  },
  hover : {
    opacity : 1,
    x: -20,
    transition : {
      duration: 0.8,
      repeat : Infinity
    }
  }
}

const arrowRight = {
  normal: {
    opacity: 0,
  },
  hover : {
    opacity : 1,
    x: 20,
    transition : {
      duration: 0.8,
      repeat : Infinity
    }
  }
}



function Slider( {type, get} : IGet){

  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryFn: () => getMovies({type, get}),
    queryKey: [type, get],
  });
  /* ================= */
  // pc & 태블릿
  const isPc = useMediaQuery(isPcCheck);
  const isTablet = useMediaQuery(isTabletCheck);
  const isMobile = useMediaQuery(isMobileCheck);
  const offset = (!isTablet) ? 6 : 4; // 한번에 보여주고 싶은 영화 수

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
  /* ================= */
  // 모바일 
  const carousel = useRef<HTMLDivElement>(null);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <SliderWrap ref={carousel}>
      <SliderTitle>{movieSliderTitle(get)}</SliderTitle>

      {/* pc, 태블릿 슬라이드 */}
      {(isPc || isTablet) &&
      <>
        <AnimatePresence custom={derectionLeft} initial={false} onExitComplete={toggleLeving}>
          <Row
            $offset={offset}
            custom={derectionLeft}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data && data.results
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
        <RightButton variants={arrowRight} whileHover="hover" initial="normal" transition={{type : "tween"}} onClick={incraseIndex}><RxDoubleArrowRight/></RightButton>
        <LeftButton variants={arrowLeft}  whileHover="hover" initial="normal" transition={{type : "tween"}} onClick={decreaseIndex}><RxDoubleArrowLeft/></LeftButton>
      </>
      }

      {/* 모바일 슬라이드 */}
      {isMobile && 
        <Row
          $offset={offset}
          drag="x" 
          dragConstraints={carousel}
          whileDrag={{pointerEvents : "none"}}
        >
        {data && data.results
          .map((movie) => (
            <Box
              onClick={() => onBoxClicked(movie.id)}
              key={movie.id}
              $bgphoto={makeImagePath(movie.backdrop_path, "w500")}
            >
            </Box>
          ))}
      </Row>
      }

    </SliderWrap>
  )
}

export default Slider;


const SliderWrap = styled(motion.div)`
  height: 20vw;
  max-height: 280px;
  position: relative;
  top: -6rem;
  left: 3rem;
  margin-right: 3rem;

    @media ${(props) => props.theme.tablet} {
      height: 25vw;
      top: initial;
      padding: 1vw;
      left: initial;
      margin-right: initial;
    }
    @media ${(props) => props.theme.mobile} {
      max-height: initial;
      height: 190px;
      margin: 10px;
    }
`;

const SliderTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 1rem;

    @media ${(props) => props.theme.tablet} {
      font-size: 1.8em;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      margin-bottom: 10px;
    }
`

const Row = styled(motion.div)<{ $offset: number }>`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat( ${(props) => props.$offset} , 1fr);
  position: absolute;
  width: 100%;

    @media ${(props) => props.theme.mobile} {
      position: absolute;
      width: auto;
      left: 0;
      display: flex;
      flex-direction: row;
      grid-template-columns: initial;
    }
`;

const Box = styled(motion.div)<{ $bgphoto: string }>`
  ${(props)=> props.$bgphoto ? 
    `background-image: url(${props.$bgphoto});
    background-size: cover;
    background-position: center;` :
    `width: 100%;
    &:after {
      content: 'No Image';
      font-size: 1.3em;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    `}
  position: relative;
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
  &:hover:after {
    visibility: hidden;
  }

    @media ${(props) => props.theme.tablet} {
      height: 18vw;
    }
    @media ${(props) => props.theme.mobile} {
      width: 100px;
      height: 150px;
      border-radius: 10px;
    }
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

const LeftButton = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  left: -3vw;
  top: 0;
  z-index: 5;
  width: 6vw;
  height: 100%;
  background: transparent;
  border: none;
  padding-block: 0;
  padding-inline: 0;
  opacity: 0;

  svg{
    position: absolute;
    font-size: 2.5em;
    left: 0.5em;
    color: white;
  }

    @media ${(props) => props.theme.tablet} {
      width: 3vw;
      left: 0;

      svg {
        display: none;
      }
    }
`

const RightButton = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
  width: 3vw;
  height: 100%;
  background: transparent;
  border: none;
  padding-block: 0;
  padding-inline: 0;
  opacity: 0;

  svg{
    position: absolute;
    font-size: 2.5em;
    right: 0.5em;
    color: white;
  }
    @media ${(props) => props.theme.tablet} {
      right: 0;

      svg {
        display: none;
      }
    }
`

