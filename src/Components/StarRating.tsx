import styled from "styled-components"
import { FaStar, FaRegStar } from "react-icons/fa"

interface Ivalue {
  value : number;
  starSize : string;
}

function StarRating({value, starSize} : Ivalue){
  return (
    <StarWrap className="star-rating">
      <Stars className="back-stars">
        {[1,2,3,4,5].map((i)=>{
          return (
            <IconsWrap key={i}>
              <FaRegStar size={starSize}/>
            </IconsWrap>
          )
        })}
      </Stars>
      <Stars className="fill-stars" style={{width: `${value}%`}}>
        {[1,2,3,4,5].map((i)=>{
          return (
            <IconsWrap key={i}>
              <FaStar size={starSize}/>
            </IconsWrap>
          )
        })}
      </Stars>
    </StarWrap>
  )
}

export default StarRating;

const StarWrap = styled.div`
  display: grid;
  justify-content: start;
`

const Stars = styled.div`
  display: flex;
  order: 1;
  grid-column: 1;
  grid-row: 2;
  align-items: center;
  justify-content: space-between;
  color: #FFBD00;
  overflow: hidden;
`

const IconsWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`