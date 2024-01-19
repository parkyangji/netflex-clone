import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Detail from "../Components/Detail";
import { useMediaQuery } from "react-responsive";
import { isMobileCheck, isPcCheck, isTabletCheck } from "../theme";
import MobileDetail from "../Components/MobileDetail";
import MobileSearch from "../Components/MobileSearch";
import SearchResult from "../Components/SearchResult";

function Search() {
  const { state } = useLocation(); // 현재 주소
  const history = useNavigate();

  const onBackClick = () => {
    history(-1);
  };

  const isPc = useMediaQuery(isPcCheck);
  const isTablet = useMediaQuery(isTabletCheck);
  const isMobile = useMediaQuery(isMobileCheck);

  return (
    <>
      <Wrap>
        {isMobile && <MobileSearch />}
        {state ?
          <>
            <SearchInfo>"{state.key}" 에 대한 검색결과</SearchInfo>
            <SearchResult />
          </>
          : null
        }
      </Wrap>
      
        {/* 팝업 */}
        {(isPc || isTablet) && state && state.id ? (
          <>
            <Back onClick={onBackClick} />
            <Detail id={state.id} />
          </>
        ) : null}
        {(isMobile) && state && state.id ? (
          <>
            <MobileDetail id={state.id} />
          </>
        ) : null}
    </>
  );
}

export default Search;

const Wrap = styled.div`
  margin-top: 85px;
`

const SearchInfo = styled.div`
  margin-bottom: 40px;
  font-size: 3em;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.5em;
    margin: 35px 0;
  }
`

const Back = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 101;
  font-size: 3em;
`

/*
    <>
      <SearchInfo>"{state.key}" 에 대한 검색결과</SearchInfo>
      <SearchWrap>
        {data &&
          data.results.map((result) => (
            <Item 
              key={result.id}
              onClick={()=>onSetClick(result.id)}
            >
              {result.poster_path ? (
                <img
                  src={makeImagePath(result.poster_path, "w300_and_h450_bestv2")}
                  alt=""
                />
              ) : (
                <EmptyImg>No Image</EmptyImg>
              )}
            </Item>
          ))}
        </SearchWrap>
    </>
      {(isPc || isTablet) && ID ? (
        <>
          <Back onClick={onBackClick} />
          <Detail id={ID} />
        </>
      ) : null}
      {(isMobile) && ID ? (
        <>
          <CloseBtn onClick={onBackClick}><IoIosClose style={{filter: "drop-shadow(0px 0px 3px rgb(0 0 0 / 0.3))"}}/></CloseBtn>
          <MobileDetail id={ID} />
        </>
      ) : null}
*/

/*
  const [ID, setID] = useState<null | string>(null);
  const onSetClick = (movieid : number) => {
    setID(movieid+"")
  }
  const onBackClick = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setID(null);
  }
*/