import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import { HelmetProvider } from "react-helmet-async";


const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Noto Sans KR', sans-serif;
  color: ${props => props.theme.white.darker};
  line-height: 1.2;
  background-color: black;
  //overflow-x: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}
button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background-color: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-appearance: none;
}

#root {
  overflow: hidden;
}
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true,
        path: "/",
        element: <Home/>,
      },
      {
        path: "/tv",
        element: <Tv/>
      },
      {
        path: "/search",
        element: <Search/>
      },
      {
        path: "/movies/:movieid",
        element: <Home/>
      },
    ],
  },
],
{ basename: process.env.PUBLIC_URL}
);

const container = document.getElementById("root");
const root = createRoot(container!);

const client = new QueryClient();

root.render(
    <RecoilRoot>
      <HelmetProvider>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </RecoilRoot>
);

