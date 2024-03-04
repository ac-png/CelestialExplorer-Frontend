import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
        const { authenticated, onAuthenticated } = useAuth();
        const navigate = useNavigate();
    
        const logout = () => {
            onAuthenticated(false);
            navigate('/logout');
        }
        
    return (
        <div className='navbar'>
            <h1>CelestialExplorer</h1>
            <ul>
                <li><Link className='link' to='/'>Home</Link></li>
                <li><Link className='link' to='/celestial_bodies'>Celestial Bodies</Link></li>
                {(authenticated) ? (
                    <>
                        <li><button className='button alert' onClick={logout}>Logout</button></li>
                        <li><Link className='link' to="/user">Account</Link></li>
                        <li><Link className='link' to="/observations">My Observations</Link></li>
                    </>
                ) : ""}
                {(!authenticated) ? (
                    <>
                        <li><Link className='link' to="/login">Login</Link></li>
                        <li><Link className='link' to="/signup">Signup</Link></li>
                    </>
                ) : ""}
            </ul>
        </div>
    );
}

export default Navbar;