import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const newState = useSelector((state) => state?.authenticate)

    console.log("PrivateRoute", newState);

    return (newState?.isAuthenticated && newState?.user?.role == 'athlete') ? <>{children}</> : <Navigate to="/login" replace={true} />
};

export default PrivateRoute;