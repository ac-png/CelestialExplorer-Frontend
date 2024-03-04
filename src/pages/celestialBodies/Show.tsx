import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBodyById } from "../../apiRoutes/bodies";
import { useAuth } from "../../contexts/AuthContext";

function Show() {
    const { id } = useParams();
    const { authenticated, onAuthenticated } = useAuth();
    const [body, setBody] = useState(null);

    useEffect(() => {
        fetchBodyById(id)
        .then((response) => {
            setBody(response);
        })
        .catch((error) => {
            console.error('Error setting body:', error);
        });
    }, [id]);

    if(!body) return <h3>Body not found</h3>

    return (
        <>
            {body && (
                <div>
                    <h2>{body.englishName}</h2>
                </div>
            )}
            <h4>Observations</h4>
            {(authenticated) ? (
                <>
                    <p>Hello!</p>
                </>
            ) : ""}
            {(!authenticated) ? (
                <>
                    <p>You are not logged in!</p>
                    <p><Link to="/login" className='button'>Login</Link> or <Link to="/signup">Signup</Link></p>
                </>
            ) : ""}
        </>
    );
}

export default Show;