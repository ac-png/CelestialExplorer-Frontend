import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../services/AuthService";

function Navigation() {
    const { authenticated, onAuthenticated } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        onAuthenticated(false);
        navigate('/login');
    }
    
    return (
        <nav className="p-6">
            <div className="items-center mr-6 inline-block">
                <span className="font-semibold text-xl tracking-tight">CelestialExplorer</span>
            </div>
            <div className="text-sm inline-block">
                {authenticated ? (
                    <>
                        <Link className="mr-4 hover:text-white" to='/user'>Profile</Link>
                        <Link className="mr-4 hover:text-white" to='/dashboard/observations'>Dashboard</Link>
                        <button className='justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="mr-4 hover:text-white" to='/login'>Login</Link>
                        <Link className="mr-4 hover:text-white" to='/signup'>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
