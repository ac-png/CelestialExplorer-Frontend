import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchObservationByUUID } from '../../services/APIService/observations';
import { formatDate, formatTime } from '../../utilities/format';

function Show() {
    const { uuid } = useParams();
    const [observation, setObservation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        let token = localStorage.getItem('token');
        setIsLoading(true);
        fetchObservationByUUID(token, uuid)
            .then((response) => {
                if (response && response.message === "No observations found!") {
                    setObservation([]);
                } else {
                    setObservation(response);
                }
            })
            .catch((error) => {
                console.error('Error fetching observations:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [uuid]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                observation ? (
                    <div>
                        <h2>Observation Data:</h2>
                        <p><strong>Celestial Body: </strong>{observation.celestial_body_id}</p>
                        <p><strong>Date and Time: </strong>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                        <p><strong>Description: </strong>{observation.description}</p>
                        <p><strong>Location: </strong>{observation.location_id}</p>
                        <p><strong>Rating: </strong>{observation.rating} out of 5</p>
                        <p><strong>Sky Conditions: </strong>{observation.sky_conditions}</p>
                    </div>
                ) : (
                    <p>No observation found.</p>
                )
            )}
        </div>
    );
}

export default Show;
