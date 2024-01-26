import { useQuery } from "@tanstack/react-query";
import { getMovies, IMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { isMobileCheck, isPcCheck, isTabletCheck } from "../theme";
import { motion } from "framer-motion";

const moreVariants = {
  hover: {
    y: -5,
    transition: {
      duaration: 0.1,
      type: "tween",
    },
  },
};

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


  const isPc = useMediaQuery(isPcCheck);
  const isTablet = useMediaQuery(isTabletCheck);
  const isMobile = useMediaQuery(isMobileCheck);

  if (isLoading) return null;
  if (isError) return null;
  
  return (<>
    {(isPc || isTablet) && data && (
      <Banner $bgphoto={makeImagePath(data.backdrop_path)}>
        <Title>{data.title}</Title>
        <Overview>{data.overview}</Overview>
        <MoreBtn 
          onClick={() => onBoxClicked(data.id)}
          variants={moreVariants}
          whileHover="hover"
          transition={{type : "tween"}}
        >more</MoreBtn>
      </Banner>
    )}

    {(isMobile) && data && (
      <Banner $bgphoto={makeImagePath(data.backdrop_path)} onClick={() => onBoxClicked(data.id)} />
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
  background-position: center;
  background-repeat: no-repeat;

    @media ${(props) => props.theme.tablet} {
      padding-top: 14em;
    }
    @media ${(props) => props.theme.mobile} {
      height: 45vh;
      padding: initial;
      margin-bottom: -10vh;
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

  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 200px;
  text-align: initial;

    @media ${(props) => props.theme.tablet} {
      width: 80%;
      font-size: 1.2em;
    }
`;

const MoreBtn = styled(motion.button)`
  cursor: pointer;
  width: 150px;
  background: transparent;
  border: 1px solid#fff;
  border-radius: 10px;
  margin-top: 2em;
  padding: 10px;
  font-size: 1em;
  color: #fff;

  &::after {
    content: '';
    display: block;
    width: 100%;
    background: white;
  }
`
