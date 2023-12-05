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
    console.log(detail.isLoading && cast.isLoading)
    return null
  }

  if (detail.isError && cast.isError) {
    console.log(detail.error.message, cast.error.message)
    return null
  }

  return (
    <BigMovie>
    {detail && detail.data && ( // Check if detail and detail.data exist
      <>
        <BigPoster
          src={makeImagePath(detail.data.poster_path, "w200")}
          alt=""
        />
        <BigTitle>{detail.data.title}</BigTitle>
        <BigOverview>{detail.data.overview}</BigOverview>
      </>
    )}
  </BigMovie>
  );
}

export default Detail;


const BigMovie = styled.div`
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