import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchObservationByUUID, updateByUUID } from '../../services/APIService/observations';
import { fetchBodies } from '../../services/APIService/bodies';
import { Rating } from '@smastrom/react-rating';

function Edit() {
    const { uuid } = useParams();
    const [observation, setObservation] = useState(null);
    const [bodies, setBodies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        let token = localStorage.getItem('token');
        fetchObservationByUUID(token, uuid)
        .then((response) => {
            if (response && response.message === "No bodies found!") {
                setObservation([]);
            } else {
                setObservation(response);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching observation:', error);
            setIsLoading(false);
        });
    }, [uuid]);

    useEffect(() => {
        fetchBodies()
        .then((response) => {
            if (response && response.message === "No bodies found!") {
                setBodies([]);
            } else {
                const sortedBodies = response.sort((a, b) => a.englishName.localeCompare(b.englishName));
                setBodies(sortedBodies);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setIsLoading(false);
        });
    }, []);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('token');
            await updateByUUID(token, uuid, observation);
            navigate('/dashboard/observations');
        } catch (error) {
            console.error('Error updating observation:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!observation || observation.length === 0) {
        return <div>No observation found!</div>;
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                    Edit Observation
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="celestial_observation_id" className="block text-lg font-medium leading-6">
                            Celestial Body
                        </label>
                        <div className="mt-2">
                            <select
                                id="celestial_observation_id"
                                value={observation.celestial_body_id}
                                name="celestial_observation_id"
                                className="block rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                                onChange={(e) => setObservation({ ...observation, celestial_body_id: e.target.value })}
                            >
                                <option value="">Select a Celestial Body</option>
                                {bodies.map(body => (
                                    <option key={body.id} value={body.id}>{body.englishName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="sky_conditions" className="block text-lg font-medium leading-6">
                            Sky Conditions
                        </label>
                        <div className="mt-2">
                            <input
                                id="sky_conditions"
                                name="sky_conditions"
                                type="text"
                                autoComplete="sky_conditions"
                                placeholder='e.g., Clear, Partly Cloudy, Overcast'
                                required
                                defaultValue={observation.sky_conditions}
                                onChange={(e) => setObservation({ ...observation, sky_conditions: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-3">
                        <div className="w-1/2">
                            <label htmlFor="date" className="block text-lg font-medium leading-6">
                                Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    autoComplete="date"
                                    defaultValue={observation.date}
                                    onChange={(e) => setObservation({ ...observation, date: e.target.value })}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="time" className="block text-lg font-medium leading-6">
                                Time
                            </label>
                            <div className="mt-2">
                                <input
                                    id="time"
                                    name="time"
                                    type="time"
                                    autoComplete="time"
                                    defaultValue={observation.time}
                                    onChange={(e) => setObservation({ ...observation, time: e.target.value })}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-lg font-medium leading-6 mt-5">
                            Rating
                        </label>
                        <div className="mt-2">
                            <Rating
                                className="mt-2 opacity-70"
                                style={{ maxWidth: 250 }}
                                value={observation.rating}
                                onChange={(value) => setObservation({ ...observation, rating: value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium leading-6 mt-5">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                autoComplete="description"
                                placeholder='Enter a detailed description of your observation...'
                                required
                                defaultValue={observation.description}
                                onChange={(e) => setObservation({ ...observation, description: e.target.value })}
                                className="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="latitude" className="block text-lg font-medium leading-6">
                                Latitude
                            </label>
                            <div className="mt-2">
                                <input
                                    id="latitude"
                                    name="latitude"
                                    type="text"
                                    autoComplete="latitude"
                                    defaultValue={observation.latitude}
                                    onChange={(e) => setObservation({ ...observation, latitude: e.target.value })}
                                    placeholder='Enter latitude (e.g., 34.0522)'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="longitude" className="block text-lg font-medium leading-6">
                                Longitude
                            </label>
                            <div className="mt-2">
                                <input
                                    id="longitude"
                                    name="longitude"
                                    type="text"
                                    autoComplete="longitude"
                                    defaultValue={observation.longitude}
                                    onChange={(e) => setObservation({ ...observation, longitude: e.target.value })}
                                    placeholder='Enter longitude (e.g., -118.2437)'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
