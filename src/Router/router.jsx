import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PostDeatils from "../Components/Latest Discussion/PostDeatils";
import PostDetailsPage from "../Components/Latest Discussion/PostDeatils";
import Membership from "../Components/Membership/Membership";
import PrivateRoutes from "../Authentication/PrivateRoutes";
import Dashboard from "../Components/Dashboard/Dashboard";
import Manageuser from "../Components/Dashboard/Admin/Manageuser";
import AdminDashboard from "../Components/Dashboard/AdminDashboard";
import UserProfile from "../Components/Dashboard/User/UserProfile";
import AddPost from "../Components/Dashboard/User/AddPost";
import MyPost from "../Components/Dashboard/User/MyPost";
import AnnouncementPage from "../Components/Dashboard/Admin/AnnouncementPage";
import Activities from "../Components/Dashboard/Admin/Activities";

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
        element: (
          <PrivateRoutes>
            <PostDetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/membership",
        element: (
          <PrivateRoutes>
            <Membership></Membership>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "manageuser",
        element: <Manageuser />,
      },
      {
        path: "addpost",
        element: <AddPost />,
      },
      {
         path:"announcement",
         element:<AnnouncementPage></AnnouncementPage>
      },
      {
        path:"activities",
        element:<Activities></Activities>
      }
      ,

      //user
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "myPost",
        element: <MyPost />,
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
