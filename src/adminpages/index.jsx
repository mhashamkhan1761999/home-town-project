import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {
    return (
        <Navigate to="/athlete/dashboard" replace={true} />
    )
}

export default Home