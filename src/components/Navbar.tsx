import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../services/AuthService";

function Navbar() {
    const { authenticated, onAuthenticated } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        onAuthenticated(false);
        navigate('/login');
    }

    return (
        <>
            <h1 className='main-title'>CelestialExplorer</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/celestial_bodies'>Celestial Bodies</Link></li>
                <ul style={{ float: 'right' }}>
                    {authenticated ? (
                        <>
                            <li><Link to="/user">Profile</Link></li>
                            <li><Link to="/observations">Dashboard</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}
                </ul>
            </ul>
        </>
    );
}

export default Navbar;
