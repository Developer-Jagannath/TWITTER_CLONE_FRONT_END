import ProtectedRoute from "@/components/layout/ProtectedRoute"
import PublicRoute from "@/components/layout/PublicRoute"
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/page/auth/LoginPage"
import RegisterPage from "@/page/auth/RegisterPage"

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,

    children: [
      {
        path: "/",
        element: <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Twitter Clone</h1>
          <p className="text-gray-600">This is your home feed. Posts will appear here.</p>
        </div>,
      },
      {
        path: "/profile",
        element: <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-gray-600">Your profile page is coming soon.</p>
        </div>,
      },
      {
        path: "/settings",
        element: <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-gray-600">Settings page is coming soon.</p>
        </div>,
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