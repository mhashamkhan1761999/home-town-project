import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = ({ children }) => {
    const newState = useSelector((state) => state?.authenticate)

    console.log("PrivateRoute", !newState?.user?.role);

    return (newState?.isAuthenticated && !newState?.user?.role) ? <>{children}</> : <Navigate to="/admin/login" replace={true} />
};

export default AdminPrivateRoute;