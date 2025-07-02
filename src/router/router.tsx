import ProtectedRoute from "@/components/layout/ProtectedRoute"
import PublicRoute from "@/components/layout/PublicRoute"
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/page/auth/LoginPage"
import RegisterPage from "@/page/auth/RegisterPage"

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, // protect all child routes here
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/profile",
        element: <div>Profile Page</div>,
      },
      // add more protected routes here
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