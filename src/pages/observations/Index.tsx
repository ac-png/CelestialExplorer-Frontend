import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchObservations } from '../../services/APIService/observations';
import { formatDate, formatTime } from '../../utilities/format';

function Index() {
    const [observations, setObservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);
    

    return (
        <div>
            <Link className="button" to='/'>Add Observation</Link>
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

export default Index;
