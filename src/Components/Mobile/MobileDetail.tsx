import { useQuery } from "@tanstack/react-query";
import { ICast, IGetDetailsResult, castMovie, detailMovie } from "../../api";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { allowScroll, makeImagePath, preventScroll } from "../../utils";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io"
import { AnimatePresence, motion } from "framer-motion";
import StarRating from "../StarRating";
import { useEffect, useState } from "react";

interface IId {
  id : string | undefined;
}

const ShowVariants = {
  hidden: {
    bottom : -window.innerHeight
  },
  visible: {
    bottom: 0 //-80
  },
  exit: {
    bottom: -window.innerHeight 
  },
};

function MobileDetail({id} : IId){
  //const {state} = useLocation();
  const searchMatch = useMatch('/m/search')

  const detail = useQuery<IGetDetailsResult>({
    queryFn: () => detailMovie(Number(id)),
    queryKey: ['detail', id],
  });
  const cast = useQuery({
    queryFn: () => castMovie(Number(id)),
    queryKey: ['cast', id],
    select(data) : ICast[] {
      return data.cast.slice(0, 6)
    },
  });
  //console.log(detail.data, cast.data)

  const history = useNavigate();
  const onBackClick = () => {
    history(-1);
    //history('/');
  }

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  if (detail.isLoading && cast.isLoading) {
    //console.log(detail.isLoading && cast.isLoading)
    return null
  }

  if (detail.isError && cast.isError) {
    //console.log(detail.error.message, cast.error.message)
    return null
  }
  return (
    <AnimatePresence>
      <BigMove
        variants={ShowVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="modal"
        transition={{ type: "tween", duration: 0.4 }}
      >
        {detail && detail.data && cast && cast.data && (
          <>
            {detail.data.poster_path ? 
            <BigPoster $bgphoto={makeImagePath(detail.data.backdrop_path)} /> 
            : <EmptyPoster>No Image</EmptyPoster>}
            <TitleBox>
              <BigTitle>{detail.data.title}</BigTitle>
              <SmallTitle>{detail.data.original_title}</SmallTitle>
            </TitleBox>
            <ExtraBox>
              <span>{detail.data.release_date}</span>
              <span>{Math.floor(detail.data.runtime / 60)+"h "+Math.floor(detail.data.runtime % 60)+"m"}</span>
              <span>{detail.data.original_language}</span>
            </ExtraBox>
            <ExtraBox>
              {detail.data.genres.map((genre)=>(<Genre key={genre.id}>{genre.name}</Genre>))}
            </ExtraBox>
            <RatingBox>
              <StarRating value={Math.round(detail.data.vote_average * 10)} starSize="1.3em"/>
            </RatingBox>
            <BigOverview>{detail.data.overview}</BigOverview>
          </>
        )} 
        { (searchMatch === null) && <BackButton onClick={onBackClick}><IoIosClose style={{filter: "drop-shadow(0px 0px 3px rgb(0 0 0 / 0.3))"}}/></BackButton>}
      </BigMove>
    </AnimatePresence>
  )
}

export default MobileDetail;


const BigMove = styled(motion.div)`
  /* display: flex;
  flex-direction: column; */
  position: fixed;
  /* top: 10%; */
  z-index: 100;
  width: 100%;
  height: 100%;
  background: black;
  /* border-top-right-radius: 30px;
  border-top-left-radius: 30px; */
  text-align: center;
  box-shadow: 0px -8px 20px 0px rgb(0 0 0 / 50%);
  /* padding-bottom: 70px; */
  /* overflow: hidden; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
    background: transparent;
  }
`

const BigPoster = styled.div<{ $bgphoto: string }>`
  height: 50%;
  /* flex: 1; */
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: top center;
`

const EmptyPoster = styled.div`
  
`

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const BigTitle = styled.span`
  font-size: 2em;
  padding: 0 1rem;
`

const SmallTitle = styled.span`
  color: rgba(255, 255, 255, 0.7);
`

const ExtraBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 0.5rem;
`

const Genre = styled.span`
  padding: 5px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  line-height: 12px;
`

const RatingBox = styled.div`
  display : flex;
  gap: 5px;
  margin-top: 1em;
  justify-content: center;
`

const BigOverview = styled.p`
  margin: 1em;
  line-height: 1.5;
  font-size: 0.9em;
  color: #fff;

  /* overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
    background: transparent;
  } */
`

const BackButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 3em;
`
