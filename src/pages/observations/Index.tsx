import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchObservations, deleteByUUID } from '../../services/APIService/observations';
import { fetchBodyById } from "../../services/APIService/bodies";
import { formatDate, formatTime } from '../../utilities/format';
import { Rating } from '../../../node_modules/@smastrom/react-rating/dist/index';

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
                const bodyPromises = response.map(observation => {
                    return fetchBodyById(observation.celestial_body_id);
                });
                Promise.all(bodyPromises)
                .then(bodyResponses => {
                    const observationsWithBodies = response.map((observation, index) => {
                        return {
                            ...observation,
                            bodyName: bodyResponses[index].englishName
                        };
                    });
                    setObservations(observationsWithBodies);
                })
                .catch(error => {
                    console.error('Error fetching body information:', error);
                    setObservations(response);
                });
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

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Observations Dashboard</h1>
                    <Link to='/dashboard/observations/create' className="mb-4 px-4 py-2 border border-green-200 text-green-700 rounded-md btn-link btn-lg mb-2">New Observation</Link>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : observations.length === 0 ? (
                    <p>No Observations Found</p>
                ) : (
                    observations.map((observation) => (
                        <div className="bg-gray-800 my-6 shadow-md rounded-md p-6" key={observation.id}>
                            <h2 className="font-bold text-2xl">
                                {observation.bodyName}
                            </h2>
                            <p className="mt-2">
                                {observation.description}
                            </p>
                            <Rating className="mt-2 opacity-70" style={{ maxWidth: 250 }} value={observation.rating} readOnly />
                            <span className="block mt-2 text-sm opacity-70">{formatDate(observation.date)} {formatTime(observation.time)}</span>
                            <Link to={`/dashboard/observations/edit/${observation.uuid}`} className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mr-3 focus-visible:outline-indigo-600"><i className="fa-solid fa-pencil mr-3"></i>Edit</Link>
                            <button className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mr-3 focus-visible:outline-indigo-600" onClick={() => handleDelete(observation.uuid)}><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
