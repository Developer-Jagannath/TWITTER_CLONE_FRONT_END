// src/components/ProtectedRoute.tsx


import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import AppLayout from "./AppLayout";

const ProtectedRoute = () => {
    const user = useAppSelector((state) => state.reducer.auth.user)

    if (!user) {
        // if user is not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // if user is logged in, render the nested protected routes
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
};

export default ProtectedRoute;
