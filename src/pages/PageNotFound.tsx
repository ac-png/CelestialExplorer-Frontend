import { useLocation } from 'react-router-dom';

function PageNotFound() {
    const location = useLocation();

    return (
    <div>
        <h1>404, Page not found!</h1>
        <p>The requested URL <strong>{location.pathname}</strong> was not found on this server.</p>
    </div>
    );
}

export default PageNotFound;
