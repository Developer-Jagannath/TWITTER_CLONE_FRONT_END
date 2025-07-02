import ProtectedRoute from "@/components/layout/ProtectedRoute"
import PublicRoute from "@/components/layout/PublicRoute"
import { createBrowserRouter } from "react-router-dom"

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
        element: <div>Login Page</div>,
      },
      {
        path: "/register",
        element: <div>Register Page</div>,
      },
    ],
  },

])

export default router