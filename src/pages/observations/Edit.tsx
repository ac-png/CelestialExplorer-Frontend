import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchObservationByUUID } from '../../services/APIService/observations';
import { fetchBodies } from '../../services/APIService/bodies';
import { Rating } from '../../../node_modules/@smastrom/react-rating/dist/index';

function Edit() {
    const { uuid } = useParams();
    const [observation, setObservation] = useState(null);
    const [bodies, setBodies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            console.error('Error fetching bodies:', error);
            setIsLoading(false);
        });
    }, [uuid]);

    useEffect(() => {
        fetchBodies()
        .then((bodies) => {
            setBodies(bodies);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!observation || observation.length === 0) {
        return <div>No bodies found!</div>;
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-4">
            <div>
                <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight">
                    Edit observation
                </h2>
            </div>
            <div className="mt-10">
                <form className="space-y-6">
                <div>
                        <label htmlFor="celestial_observation_id" className="block text-sm font-medium leading-6">
                            Celestial Body
                        </label>
                        <div className="mt-2">
                            <select
                                id="celestial_observation_id"
                                value={observation.celestial_body_id}
                                name="celestial_observation_id"
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            >
                                <option value="">Select a Celestial Body</option>
                                {bodies.map(body => (
                                    <option key={body.id} value={body.id}>{body.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="sky_conditions" className="block text-sm font-medium leading-6">
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
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                        <label htmlFor="rating" className="block text-sm font-medium leading-6">
                            Rating
                        </label>
                        <div className="mt-2">
                        <Rating
                            className="mt-2 opacity-70"
                            style={{ maxWidth: 250 }}
                            value={observation.rating}
                        />
                        </div>
                        <div>
                        <label htmlFor="date" className="block text-sm font-medium leading-6">
                            Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="date"
                                name="date"
                                type="date"
                                autoComplete="date"
                                required
                                defaultValue={observation.date}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                        <label htmlFor="time" className="block text-sm font-medium leading-6">
                            Time
                        </label>
                        <div className="mt-2">
                            <input
                                id="time"
                                name="time"
                                type="time"
                                autoComplete="time"
                                required
                                defaultValue={observation.time}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6">
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
                                className="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="latitude" className="block text-sm font-medium leading-6">
                                Latitude
                            </label>
                            <div className="mt-2">
                                <input
                                    id="latitude"
                                    name="latitude"
                                    type="text"
                                    autoComplete="latitude"
                                    defaultValue={observation.latitude}
                                    placeholder='Enter latitude (e.g., 34.0522)'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="longitude" className="block text-sm font-medium leading-6">
                                Longitude
                            </label>
                            <div className="mt-2">
                                <input
                                    id="longitude"
                                    name="longitude"
                                    type="text"
                                    autoComplete="longitude"
                                    defaultValue={observation.longitude}
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
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
