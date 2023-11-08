import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";


function App(){
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App;