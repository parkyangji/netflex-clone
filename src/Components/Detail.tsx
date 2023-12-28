import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetDetailsResult, castMovie, detailMovie, ICast } from "../api";
import { makeImagePath } from "../utils";
import { FaStar, FaRegStar } from "react-icons/fa"
import StarRating from "./StarRating";

interface IId {
  id : string | undefined;
}

function Detail( {id} : IId ) {
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

  if (detail.isLoading && cast.isLoading) {
    //console.log(detail.isLoading && cast.isLoading)
    return null
  }

  if (detail.isError && cast.isError) {
    //console.log(detail.error.message, cast.error.message)
    return null
  }

  return (
    <BigMovie>
    {detail && detail.data && cast && cast.data && ( // Check if detail and detail.data exist
      <>
        {detail.data.poster_path ? 
          <BigPoster
          src={makeImagePath(detail.data.poster_path)}
          alt=""
        /> : <EmptyPoster>No Image</EmptyPoster>}
        <TitleBox>
          <BigTitle>{detail.data.title}</BigTitle>
          <SmallTitle>{detail.data.original_title}</SmallTitle>
        </TitleBox>
        <ExtraBox>
          <span>{detail.data.release_date}</span>
          <span>{Math.floor(detail.data.runtime / 60)+"h "+Math.floor(detail.data.runtime % 60)+"m"}</span>
          <span>{detail.data.original_language}</span>
        </ExtraBox>
        <GenreBox>{detail.data.genres.map((genre)=>(<Genre key={genre.id}>{genre.name}</Genre>))}</GenreBox>
        <RatingBox>
          <StarRating value={Math.round(detail.data.vote_average * 10)} starSize="1.2em" />
          <span>&#40;{Math.round(detail.data.vote_average * 10)}%&#41;</span>
        </RatingBox>
        <BigOverview>{detail.data.overview}</BigOverview>

        <Actor>주요 출연진</Actor>
        <ActorWrap>
          {cast.data.map((member) => (
            <ActorBox key={member.id} >
              {member.profile_path ? 
               <ActorImg src={makeImagePath(member.profile_path)} alt="" /> 
               : <EmptyActor>No Image</EmptyActor>}
              <span>{member.name}</span>
              <SmallTitle>{member.character}</SmallTitle>
            </ActorBox>
          ))}
        </ActorWrap>
      </>
    )}
  </BigMovie>
  );
}

export default Detail;


export const BigMovie = styled.div`
  padding: 3vw;
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: transparent;
  }
  background: linear-gradient(180deg, rgb(100 10 10) 40%, rgb(37 0 0) 100%);
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;
`;

const EmptyPoster = styled.div`
  height: 50%;
  min-height: 300px;
  float: left;
  margin-right: 3vw;
  margin-bottom: 3vw;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`

const BigPoster = styled.img`
  height: 50%;
  min-height: 300px;
  float: left;
  margin-right: 3vw;
  margin-bottom: 3vw;
`

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vw;
`

const BigTitle = styled.span`
  font-size: 1.5em;
`;
const SmallTitle = styled.span`
  color: #d0d0d0;
`

const ExtraBox = styled.div`
  display: flex;
  gap: 10px;
  margin: 1em 0 0.5em;
`

const GenreBox = styled.div`
  display: flex;
  gap: 10px;
`

const Genre = styled.span`
  padding: 5px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 12px;
`

const RatingBox = styled.div`
  display : flex;
  gap: 5px;
  margin-top: 0.5em;
`
const BigOverview = styled.p`
  margin: 1em;
  color: ${(props) => props.theme.white.lighter};
`

const Actor = styled.span`
  clear: both;
  display: block;
  font-size: 1.2em;
`
const ActorWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 1vw;
  row-gap: 3vw;
  padding: 2em;
`

const ActorBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.2vw;

    @media ${(props) => props.theme.tablet} {
      min-width: 160px;
    }
`

const ActorImg = styled.img`
  width: 13vw;
  max-width: 200px;

    @media ${(props) => props.theme.tablet} {
      width: 100%;
      align-self: center;
      max-width: 160px;
    }
`

const EmptyActor = styled.div`
  height: 100%;
  width: 13vw;
  max-width: 200px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

    @media ${(props) => props.theme.tablet} {
      width: 100%;
    }
`