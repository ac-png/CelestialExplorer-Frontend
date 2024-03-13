import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBodyById } from "../../services/APIService/bodies";
import { fetchObservationByBody } from '../../services/APIService/observations';
import { formatDate, formatTime } from '../../utilities/format';
import { useAuth } from "../../services/AuthService";

function Show() {
    const { id } = useParams();
    const { authenticated } = useAuth();
    const [body, setBody] = useState(null);
    const [observations, setObservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBodyById(id)
        .then((response) => {
            setBody(response);
        })
        .catch((error) => {
            console.error('Error setting body:', error);
        });

        let token = localStorage.getItem('token');
        fetchObservationByBody(token, id)
        .then((response) => {
            if (response && response.message === "No observations found!") {
                setObservations([]);
            } else {
                setObservations(response);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching observations:', error);
            setIsLoading(false);
        });
    }, [id]);

    if (!body) return <h3>Body not found</h3>;

    return (
        <div>
            <h2>{body.englishName}</h2>
            <h4>Observations</h4>
            {!authenticated ? (
                <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to view observations.</p>
            ) : (
                <>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : observations.length === 0 ? (
                        <p>No Observations Found</p>
                    ) : (
                        observations.map((observation) => (
                            <Link to={`/observations/${observation.uuid}`} key={observation.id} className="card-link">
                                <div className="card">
                                    <p><strong>Name of Object: </strong>{observation.celestial_body_id}</p>
                                    <p><strong>Date and Time: </strong>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                                    <p><strong>Description: </strong>{observation.description}</p>
                                    <p><strong>Rating: </strong>{observation.rating} out of 5</p>
                                </div>
                            </Link>
                        ))
                    )}
                </>
            )}
        </div>
    );
}

export default Show;
