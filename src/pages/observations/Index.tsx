import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchObservations, deleteByUUID } from '../../services/APIService/observations';
import { fetchBodyById } from '../../services/APIService/bodies';
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

    const handleDelete = async (uuid) => {
        let token = localStorage.getItem('token');
        try {
            await deleteByUUID(token, uuid);
            fetchObservations(token)
            .then(response => {
                setObservations(response);
            })
            .catch(error => {
                console.error('Error fetching observations after deletion:', error);
            });
        } catch (error) {
            console.error('Error deleting observation:', error);
        }
    };
    
    const fetchBodyDetails = async (id) => {
        try {
            const bodyDetails = await fetchBodyById(id);
            console.log('Body details:', bodyDetails);
            return bodyDetails.name;
        } catch (error) {
            console.error('Error fetching body details:', error);
            return '';
        }
    };

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
                        <div className=" card my-6 p-6">
                            <h2 className="font-bold text-2xl">
                                {observation.celestial_body_id}
                            </h2>
                            <p className="mt-2">
                                {observation.description}
                            </p>
                            <span className="block mt-4 text-sm opacity-70">{formatDate(observation.date)} {formatTime(observation.time)}</span>
                            <button className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mr-3 focus-visible:outline-indigo-600" onClick={() => handleDelete(observation.uuid)}><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                            <button className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => fetchBodyDetails(observation.celestial_body_id)}>Fetch Body Details</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
