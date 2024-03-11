import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBodyById } from "../../services/APIService/bodies";
import { useAuth } from "../../services/AuthService";
import { fetchObservations } from '../../services/APIService/observations';
import { formatDate, formatTime } from '../../utilities/format';

function Show() {
    const { id } = useParams();
    const { authenticated, onAuthenticated } = useAuth();
    const [body, setBody] = useState(null);
    const [observations, setObservations] = useState([]);

    useEffect(() => {
        fetchBodyById(id)
        .then((response) => {
            setBody(response);
        })
        .catch((error) => {
            console.error('Error setting body:', error);
        });
    }, [id]);

    useEffect(() => {
        if (authenticated) {
            let token = localStorage.getItem('token');
            fetchObservations(token)
            .then((observations) => {
                setObservations(observations);
            })
            .catch((error) => {
                console.error('Error fetching observations:', error);
            });
        }
    }, [id, authenticated]);
    

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
                    {observations.map((observation) => (
                        <div key={observation.id}>
                            <p>{observation.location_id}</p>
                            <p>{observation.celestial_body_id}</p>
                            <p>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                            <p>{observation.description}</p>
                            <p>{observation.rating}</p>
                            <hr />
                        </div>
                    ))}
                </>
            ) : ""}
            {(!authenticated) ? (
                <>
                    <div className="alert alert-danger" role="alert">
                        <p>You are not logged in!</p>
                        <p><Link to="/login" className='button'>Login</Link> or <Link to="/signup">Signup</Link></p>
                    </div>

                </>
            ) : ""}
        </>
    );
}

export default Show;