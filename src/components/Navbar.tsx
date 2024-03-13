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
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/celestial_bodies'>Celestial Bodies</Link></li>
            <li style={{ float: 'right' }}>
                {authenticated ? (
                    <>
                        <Link to="/user">Profile</Link>
                        <Link to="/observations">Dashboard</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </li>
        </ul>
    );
}

export default Navbar;
