// src/components/ProtectedRoute.tsx


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const user = true // replace with your actual auth check

    if (!user) {
        // if user is not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // if user is logged in, render the nested protected routes
    return <Outlet />;
};

export default ProtectedRoute;
