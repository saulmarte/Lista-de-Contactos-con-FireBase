import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to='/LogIn' />
    }

    return <Outlet />
}

export default ProtectedRoutes