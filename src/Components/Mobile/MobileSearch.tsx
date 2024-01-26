import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "../../Routes/Search";

interface IForm {
  keyword : string;
}

function MobileSearch(){
  const { register, handleSubmit } = useForm<IForm>();

  const history = useNavigate();
  const onValid = (data:IForm) => {
    //console.log(data);
    // useNavigate로 prop 전달
    history(`/search?keyword=${data.keyword}`, {state: {key : data.keyword}});
  }

  return (
    <Wrap>
      <form onSubmit={handleSubmit(onValid)}>
        <Input {...register("keyword", {required: true, minLength: 2})}/>
      </form>
    </Wrap>
  )
}

export default MobileSearch;

const Wrap = styled.div`
  margin-top: 65px;
  padding: 1vw;
`

const Input = styled.input`
  display: block;
  width: 80%;
  height: 30px;
  margin: 0 auto;
`