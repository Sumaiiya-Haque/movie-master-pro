import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies/AllMovies";
import MyCollections from "../pages/MyCollections/MyCollections";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
         path:"/",
         element:<Home></Home>   
        },
         {
         path:"/all-movies",
         element:<AllMovies></AllMovies>   
        },
         {
         path:"/my-collections",
         element:<MyCollections></MyCollections>  
        },
         {
         path:"/login",
         element:<Login></Login>   
        },
         {
         path:"/register",
         element:<Register></Register>   
        },
    ]
  },
]);

export default router;