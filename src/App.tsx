import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer"
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./Components/MobileHeader";
import { isMobileCheck } from "./theme";


function App(){
  const isMobile = useMediaQuery(isMobileCheck);

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>넷플릭스 클론</title>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet" />
        </Helmet>
        <MobileHeader/>
        <Outlet/>
      </>
    )
  } else {
    return (
      <>
        <Helmet>
          <title>넷플릭스 클론</title>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet" />
        </Helmet>
        <Header/>
        <Outlet/> 
        <Footer/>
      </>
    )
  }
  // <Outlet/> => index.tsx에 router
}

export default App;