import { useEffect, useState } from "react";
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
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link className="mb-4 px-4 py-2 border border-green-200 text-green-700 rounded-md btn-link btn-lg mb-2" to='/dashboard/observations/create'>+ New Observation</Link>
                {isLoading ? (
                    <p>Loading...</p>
                ) : observations.length === 0 ? (
                    <p>No Observations Found</p>
                ) : (
                    observations.map((observation) => (
                        <div className=" card my-6 p-6 sm:rounded-lg">
                            <h2 className="font-bold text-2xl">
                                {observation.celestial_body_id}
                            </h2>
                            <p className="mt-2">
                                {observation.description}
                            </p>
                            <span className="block mt-4 text-sm opacity-70">{formatDate(observation.date)} {formatTime(observation.time)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
