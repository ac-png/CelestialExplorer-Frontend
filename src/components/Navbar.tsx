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
        <div className='navbar'>
            <h1>CelestialExplorer</h1>
            <ul>
                <li key="home"><Link to='/'>Home</Link></li>
                <li key="celestial_bodies"><Link to='/celestial_bodies'>Celestial Bodies</Link></li>
                {authenticated ? (
                    <>
                        <li key="account"><Link to="/user">Account</Link></li>
                        <li key="observations"><Link to="/observations">My Observations</Link></li>
                        <li key="logout" onClick={logout}><a href="#">Logout</a></li>

                    </>
                ) : (
                    <>
                        <li key="login"><Link to="/login">Login</Link></li>
                        <li key="signup"><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
