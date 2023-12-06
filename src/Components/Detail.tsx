import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetDetailsResult, castMovie, detailMovie } from "../api";
import { makeImagePath } from "../utils";

interface IId {
  id : string | undefined;
}

interface ICast {
  cast : []
}

function Detail( {id} : IId ) {
  const detail = useQuery<IGetDetailsResult>({
    queryFn: () => detailMovie(Number(id)),
    queryKey: ['detail', id],
  });
  const cast = useQuery({
    queryFn: () => castMovie(Number(id)),
    queryKey: ['cast', id],
    select(data : ICast) {
      return data.cast
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
    {detail && detail.data && ( // Check if detail and detail.data exist
      <>
        <BigPoster
          src={makeImagePath(detail.data.poster_path)}
          alt=""
        />
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
        <span>{Math.round(detail.data.vote_average * 10)}%</span>
        <BigOverview>{detail.data.overview}</BigOverview>
      </>
    )}
  </BigMovie>
  );
}

export default Detail;


const BigMovie = styled.div`
  position: fixed;
  width: 70vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(180deg, rgb(100 10 10) 40%, rgb(37 0 0) 100%);
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;
`;


const BigPoster = styled.img`
  height: 50%;
  min-height: 300px;
  float: left;
  margin: 3vw;
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

const BigOverview = styled.p`
  padding: 1em;
  color: ${(props) => props.theme.white.lighter};
`