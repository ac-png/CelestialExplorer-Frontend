import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchObservations } from '../../services/APIService/observations';

function Index() {
    const [observations, setObservations] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        fetchObservations(token)
        .then((observations) => {
            setObservations(observations);
        })
        .catch((error) => {
            console.error('Error fetching observations:', error);
        });
    }, []);

    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };    

    return (
        <div>
            <Link className="button" to='/'>Add Observation</Link>
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
        </div>
    );
}

export default Index;
