import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies/AllMovies";
import MyCollections from "../pages/MyCollections/MyCollections";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import AddMovie from "../pages/AddMovies/AddMovie";
import EditMovie from "../pages/Edit/EditMovie";
import MoviesByGenre from "../pages/MoviesByGenre/MoviesByGenre";
import PrivateRoute from "../providers/PrivateRoute";
import MyProfile from "../pages/MyProfile/MyProfile";
import WatchList from "../pages/WatchList/WatchList";
// import Watchlist from "../pages/WatchList/WatchList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-movies",
        element: <AllMovies></AllMovies>,
        loader: () =>
          fetch("https://movie-master-pro-server-two.vercel.app/movies"),
        // fetch(`https://movie-master-pro-server-two.vercel.app/movies?genres=Action,Sci-Fi&min=7&max=9`)
      },
      {
        path: "/my-collections",
        element: (
          <PrivateRoute>
            <MyCollections></MyCollections>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/movie-details/:id",
        element: <MovieDetails></MovieDetails>,
        //  loader:({params})=>fetch(`https://movie-master-pro-server-two.vercel.app/movies/${params.id}`,{
        //   headers:{
        //     authorization: "hello"
        //   }
        //  })
      },
      {
        path: "/edit-details/:id",
        element: <EditMovie></EditMovie>,
        loader: ({ params }) =>
          fetch(
            `https://movie-master-pro-server-two.vercel.app/movies/${params.id}`
          ),
      },
      {
        path: "/add-movie",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/movies-by-genres",
        element: <MoviesByGenre></MoviesByGenre>,
      },
      {
        path: "/watch-list",
        element: (
          <PrivateRoute>
            <WatchList></WatchList>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
