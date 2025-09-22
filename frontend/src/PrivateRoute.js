import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Check if the 'isLoggedIn' flag exists in the browser's storage
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    // If the user is authenticated, render the component they asked for (e.g., <Welcome />)
    if (isAuthenticated) {
        return children;
    }

    // Otherwise, redirect them to the login page
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;