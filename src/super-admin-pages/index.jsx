import React from 'react'
import { Navigate } from 'react-router-dom'

const SuperAdminHome = () => {
    return (
        <Navigate to="/admin/dashboard" replace={true} />
    )
}

export default SuperAdminHome