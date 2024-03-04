import { fetchObservations } from '../../services/APIService/observations';
import { useEffect, useState } from "react";

function Index () {
    const [observation, setObservation] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            fetchObservations(token)
                .then(observation => fetchObservations(observation))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <>
        </>
    );
}

export default Index;
