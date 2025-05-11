import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PostDeatils from "../Components/Latest Discussion/PostDeatils";
import PostDetailsPage from "../Components/Latest Discussion/PostDeatils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <PostDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Register />,
  },
]);

export default router;
