import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBodyById } from "../../services/APIService/bodies";
import { fetchObservations } from '../../services/APIService/observations';
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
        fetchObservations(token)
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
            {(authenticated && !isLoading) && (
                <Link className="button" to="/">Add Observation</Link>
            )}
            {isLoading ? (
                <p>Loading...</p>
            ) : observations.length === 0 ? (
                <p>No Observations Found</p>
            ) : (
                observations.map((observation) => (
                    <div key={observation.id}>
                        <p>{observation.location_id}</p>
                        <p>{observation.celestial_body_id}</p>
                        <p>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                        <p>{observation.description}</p>
                        <p>{observation.rating}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Show;
