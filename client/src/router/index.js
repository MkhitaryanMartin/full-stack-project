import { createRef } from "react";
import {createBrowserRouter} from "react-router-dom";
import { Login, Home, Product, Basket } from "../pages";
import Reaquire from "../HOC/require";
import Layout from "../components/root-layout";
import Registration from "../pages/registration";

const homeRef = createRef();
const productRef = createRef();
const basketRef = createRef();
const loginRef = createRef();
const registration = createRef();

export const routes = [
    {path: "/", element: <Home/>, name:"Home", nodeRef: homeRef},
    {path: "/product/:id", element: <Product/>, name:"Product",  nodeRef: productRef},
    {path: "/basket", element: <Reaquire><Basket/></Reaquire>, name:"Basket", nodeRef: basketRef},
    {path: "/login", element: <Login/>, name:"Login", nodeRef: loginRef},
    {path: "/registration", element: <Registration/>, name:"Registration", nodeRef: registration},
  ];

export const headerRoutes = [
  {path: "/",  name:"Home"},
  {path: "/login", name:"Login"},
]


  export const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.element,
      })),
    },
  ])