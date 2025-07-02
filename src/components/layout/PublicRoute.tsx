// src/components/PublicRoute.tsx


import { Navigate, Outlet } from "react-router-dom";


const PublicRoute = () => {
    const user = false;

    if (!user) {
        // if user is logged in, redirect away from login/register
        return <Navigate to="/" replace />;
    }

    // if not logged in, allow access to login/register
    return <Outlet />;
};

export default PublicRoute;
