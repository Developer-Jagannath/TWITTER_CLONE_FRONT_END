import ProtectedRoute from "@/components/layout/ProtectedRoute"
import PublicRoute from "@/components/layout/PublicRoute"
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/page/auth/LoginPage"
import RegisterPage from "@/page/auth/RegisterPage"
import HomePage from "@/page/main/HomePage"
import ProfilePage from "@/page/main/ProfilePage"

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      
    ],

  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
])

export default router