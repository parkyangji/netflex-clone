import React, { Children } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import { HelmetProvider } from "react-helmet-async";


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
  ]
  }
])

const container = document.getElementById("root");
const root = createRoot(container!);

const client = new QueryClient();

root.render(
    <RecoilRoot>
      <HelmetProvider>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </RecoilRoot>
);