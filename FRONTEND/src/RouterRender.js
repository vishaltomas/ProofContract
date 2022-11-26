import React from 'react'
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import {createBrowserRouter, Outlet} from 'react-router-dom'
import CreateDoc from './pages/CreateDoc';
import SignDoc from './pages/SignDoc';


const router = createBrowserRouter([
    {
      path: "/",
      element: <div id="App" className='h-screen'><Navbar /><Outlet/></div>,
      children:[
          {
              path:'dashboard',
              element:<Dashboard/>
          },
          {
            path:"createdoc",
            element:<CreateDoc/>
          },
          {
            path: "createsign",
            element:<SignDoc/>
          }
      ]
    },
  ]);

  export default router