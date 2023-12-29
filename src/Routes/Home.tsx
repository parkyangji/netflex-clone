import styled from "styled-components";
import Slider from "../Components/Slider";
import { useMatch, useNavigate } from "react-router-dom";
import Detail from "../Components/Detail";
import MainVisual from "../Components/MainVisual";
import { useMediaQuery } from "react-responsive";
import MobileDetail from "../Components/MobileDetail";


function Home() {
  const bigMovieMatch = useMatch("/movies/:movieid");
  const history = useNavigate();
  const onBackClick = () => {
    history(-1);
  };

  const isPc = useMediaQuery({
    query: `(min-width : 1024px)`
  })
  const isTablet = useMediaQuery({
    query: `(min-width : 768px) and (max-width : 1023px)`
  })
  const isMobile = useMediaQuery({
    query: `(max-width : 767px)`
  })
  return (
    <>
    <Wrapper>
      {/* 메인 비주얼 */}
      <MainVisual/>

      {/* 영화슬라이더 */}
      <Slider type="movie" get="now_playing" />
      <Slider type="movie" get="popular" />
      <Slider type="movie" get="top_rated" />
      <Slider type="movie" get="upcoming" />
    </Wrapper>
      {/* 팝업 */}
      {(isPc || isTablet) && bigMovieMatch ? (
        <>
          <Back onClick={onBackClick} />
          <Detail id={bigMovieMatch?.params.movieid} />
        </>
      ) : null}
      {isMobile && bigMovieMatch ? (
        <>
          <Back onClick={onBackClick} />
          <MobileDetail id={bigMovieMatch?.params.movieid} />
        </>
      ) : null}
    </>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
`;

const Back = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;