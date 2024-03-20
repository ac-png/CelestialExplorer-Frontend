import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchObservationByUUID, deleteByUUID } from '../../services/APIService/observations';
import { formatDate, formatTime } from '../../utilities/format';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function Show() {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [observation, setObservation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0)

    useEffect(() => {
        let token = localStorage.getItem('token');
        setIsLoading(true);
        fetchObservationByUUID(token, uuid)
            .then((response) => {
                if (response && response.message === "No observations found!") {
                    setObservation([]);
                } else {
                    setObservation(response);
                    setRating(response.rating)
                }
            })
            .catch((error) => {
                console.error('Error fetching observations:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [uuid]);

    const handleDelete = () => {
        let token = localStorage.getItem('token');
        setIsLoading(true);
        deleteByUUID(token, uuid)
            .then(() => {
                navigate('/dashboard/observations');
            })
            .catch((error) => {
                console.error('Error deleting observation:', error);
                setIsLoading(false);
            });
    };

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
                        <p><strong>Rating:</strong><Rating style={{ maxWidth: 250 }} value={rating} readOnly /></p>
                        <p><strong>Sky Conditions: </strong>{observation.sky_conditions}</p>
                        <button className='delete-button' onClick={handleDelete}>Delete Observation</button>
                    </div>
                ) : (
                    <p>No observation found.</p>
                )
            )}
        </div>
    );
}

export default Show;
