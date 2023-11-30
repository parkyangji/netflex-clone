import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetDetailsResult, detailMovie } from "../api";
import { makeImagePath } from "../utils";

interface IId {
  id : string | undefined;
}

function Detail( {id} : IId ) {
  const { data } = useQuery<IGetDetailsResult>({
    queryFn: () => detailMovie(Number(id)),
    queryKey: ['detail', id],
  });

  return (<>
      {data ? (
        <BigMoive>
          <BigPoster
            src={makeImagePath(data.poster_path, "w200")}
            alt=""
          />
          <BigTitle>{data.title}</BigTitle>
          <BigOverview>{data.overview}</BigOverview>
        </BigMoive>
      ) : null}
    </>
  );
}

export default Detail;


const BigMoive = styled.div`
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