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
        <>
            <h1>CelestialExplorer</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/celestial_bodies'>Celestial Bodies</Link></li>
                {(authenticated) ? (
                    <>
                        <li><button className='button alert' onClick={logout}>Logout</button></li>
                        <li><Link to="/user">Account</Link></li>
                        <li><Link to="/observations">My Observations</Link></li>
                    </>
                ) : ""}
                {(!authenticated) ? (
                    <>
                        <li><Link to="/login" className='button'>Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : ""}
            </ul>
        </>
    );
}

export default Navbar;