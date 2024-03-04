import { fetchObservations } from '../../apiRoutes/observations';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Index () {
    const { authenticated } = useAuth();
    const [obsevation, setObservation] = useState(null);

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
