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
        const confirmDelete = window.confirm("Are you sure you want to delete this observation?");
        if (!confirmDelete) {
            return;
        }
    
        let token = localStorage.getItem('token');
        try {
            await deleteByUUID(token, uuid);
            const updatedObservations = observations.filter(obs => obs.uuid !== uuid);
            setObservations(updatedObservations);
    
            if (updatedObservations.length === 0) {
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error deleting observation:', error);
        }
    };
    
    

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Observations Dashboard</h1>
                    <Link to='/dashboard/observations/create' className="mb-4 px-4 py-2 border border-green-600 text-green-600 rounded-md btn-link btn-lg mb-2 hover:bg-green-600 hover:text-gray-800"><i className="mr-2 fa-solid fa-plus"></i>New Observation</Link>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : observations.length === 0 ? (
                    <p className="bg-gray-800 shadow-md rounded-md p-6 mt-5">
                        <p className="text-red-600 text-2xl font-bold">No Observations Found!</p>
                    </p>
                ) : (
                    observations.map((observation) => (
                        <div className="bg-gray-800 my-6 shadow-md rounded-md p-6" key={observation.id}>
                            <h2 className="font-bold text-2xl">
                                {observation.bodyName}
                            </h2>
                            <p className="mt-2">
                                <strong>Description: </strong>{observation.description}
                            </p>
                            <p className="mt-2">
                                <strong>Location: </strong>{observation.latitude}, {observation.longitude}
                            </p>
                            <p className="block mt-2"><strong>Date and Time: </strong>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                            <p className="flex items-center mb-3">
                                <strong>Rating: </strong><Rating className="block mt-2 opacity-100" style={{ maxWidth: 250 }} value={observation.rating} readOnly />
                            </p>
                            <Link to={`/dashboard/observations/edit/${observation.uuid}`} className="px-4 border border-yellow-600 text-yellow-600 mr-3 py-2.5 rounded-md btn-link btn-lg mb-2 hover:bg-yellow-600 hover:text-gray-800"><i className="fa-solid fa-pencil mr-3"></i>Edit</Link>
                            <button className="px-4 py-2 border border-red-600 text-red-600 mr-3 bg-gray-800 rounded-md btn-link btn-lg mb-2 hover:bg-red-600 hover:text-gray-800" onClick={() => handleDelete(observation.uuid)}><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
