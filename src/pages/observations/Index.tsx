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
            <div><Link className="button" to='/dashboard/observations/create'>Add Observation</Link></div>
            {isLoading ? (
                <p>Loading...</p>
            ) : observations.length === 0 ? (
                <p>No Observations Found</p>
            ) : (
                observations.map((observation) => (
                    <Link to={`/dashboard/observations/${observation.uuid}`} key={observation.id} className="card-link">
                        <div className="card">
                            <p><strong>Name of Object: </strong>{observation.celestial_body_id}</p>
                            <p><strong>Date and Time: </strong>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                            <p><strong>Description: </strong>{observation.description}</p>
                            <p><strong>Rating: </strong>{observation.rating} out of 5</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}

export default Index;
