import { useLocation } from "react-router-dom";

function Search(){
  const {state} = useLocation() // 현재 주소
  //console.log(state.key)
  return null
}

export default Search;