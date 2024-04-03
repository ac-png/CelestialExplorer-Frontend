import { useEffect, useState } from 'react';
import { getTodayDate, getCurrentTime } from '../../utilities/format';
import { CreateObservation } from '../../services/APIService/observations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthService';
import { fetchBodies } from "../../services/APIService/bodies";
import { Rating } from '../../../node_modules/@smastrom/react-rating/dist/index';

function Create() {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [bodies, setBodies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        sky_conditions: '',
        celestial_body_id: '',
        rating: '',
        description: '',
        date: getTodayDate(),
        time: getCurrentTime()
    });

    useEffect(() => {
        fetchBodies()
        .then((bodies) => {
            setBodies(bodies);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let token = localStorage.getItem('token');
            await CreateObservation(
                token,
                form.sky_conditions,
                form.celestial_body_id,
                form.rating,
                form.description,
                form.date,
                form.time
            );
            navigate('/dashboard/observations');
            setForm({
                sky_conditions: '',
                celestial_body_id: '',
                rating: '',
                description: '',
                date: getTodayDate(),
                time: getCurrentTime()
            });
        } catch (error) {
            console.error('Error creating observation:', error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-4">
            <div>
                <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight">
                    Create new observation
                </h2>
            </div>
            <div className="mt-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="celestial_body_id" className="block text-sm font-medium leading-6">
                            Celestial Body
                        </label>
                        <div className="mt-2">
                            <select
                                id="celestial_body_id"
                                name="celestial_body_id"
                                value={form.celestial_body_id}
                                onChange={handleChange}
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
                                value={form.sky_conditions}
                                onChange={handleChange}
                                placeholder='e.g., Clear, Partly Cloudy, Overcast'
                                required
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium leading-6">
                            Rating
                        </label>
                        <div className="mt-2">
                        {/* <Rating
                            className="mt-2 opacity-70"
                            style={{ maxWidth: 250 }}
                        /> */}
                        </div>
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
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
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
                                value={form.time}
                                onChange={handleChange}
                                required
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
                                value={form.description}
                                placeholder='Enter a detailed description of your observation...'
                                onChange={handleChange}
                                required
                                className="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 text-black focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
