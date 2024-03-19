import { useState } from 'react';
import { getTodayDate, getCurrentTime } from '../../utilities/format';
import { CreateObservation } from '../../services/APIService/observations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthService';

function Create() {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        sky_conditions: '',
        celestial_body_id: '',
        rating: '',
        description: '',
        date: getTodayDate(),
        time: getCurrentTime()
    });

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
        <div className='crud-form'>
            <form onSubmit={handleSubmit}>
                <h2>Create Observation</h2>
                <label htmlFor="sky_conditions">Sky Conditions</label><br />
                <input
                    type="text"
                    id="sky_conditions"
                    name="sky_conditions"
                    value={form.sky_conditions}
                    onChange={handleChange}
                    placeholder="e.g., Clear, Partly Cloudy, Overcast"
                    required
                /><br />
                <label htmlFor="celestial_body_id">Celestial Body</label><br />
                <input
                    type="text"
                    id="celestial_body_id"
                    name="celestial_body_id"
                    value={form.celestial_body_id}
                    onChange={handleChange}
                    placeholder="Start typing to see suggestions"
                    required
                /><br />
                <label htmlFor="rating">Rating</label><br />
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                    required
                /><br />
                <label htmlFor="description">Description</label><br />
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter a detailed description of your observation..."
                    required
                /><br />
                <label htmlFor="dateInput">Date</label><br />
                <input
                    type="date"
                    id="dateInput"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                /><br />
                <label htmlFor="timeInput">Time</label><br />
                <input
                    type="time"
                    id="timeInput"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Create;
