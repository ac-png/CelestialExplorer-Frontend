import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../services/AuthService";

function Navigation() {
    const { authenticated, onAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        onAuthenticated(false);
        navigate('/');
    }
    
    const showNavigation = !['/', '/login', '/signup'].includes(location.pathname);

    return (
        <>
            {showNavigation && (
                <nav className="p-6 flex justify-between items-center">
                    <div className='flex items-center'>
                        <Link className="font-semibold text-3xl tracking-tight" to='/'>CelestialExplorer</Link>
                        <Link className="ml-4 hover:text-white" to='/celestial-bodies'>CelestialBodies</Link>
                        <Link className="ml-4 hover:text-white" to='/dashboard/observations'>Observations</Link>
                    </div>
                    <div className="text-sm">
                        <Link className="mr-4 hover:text-white" to='/user'><i className="mr-2 fa-solid fa-user"></i>Profile</Link>
                        <button className='rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={logout}><i className="mr-2 fa-solid fa-arrow-right-from-bracket"></i>Logout</button>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navigation;
