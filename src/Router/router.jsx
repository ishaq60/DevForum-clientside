import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home";
import Login from "../Authentication/Login";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
          {
            index:true,
            element:<Home/>
          }
        ]
        
    },
    {
           path:'/login',
           element:<Login/>
        }
  ]);

  export default router