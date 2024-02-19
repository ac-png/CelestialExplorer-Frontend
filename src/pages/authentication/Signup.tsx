import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Signup() {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();

    const errorStyle = {
        color: 'red',
    };

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost/api/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password,
            })
            .then((response) => {
                onAuthenticated(true, response.data.token);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            });
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                <b>Name</b><br />
                <input onChange={handleForm} type="text" name="name" value={form.name} />
            </label><br /><br />
            <label htmlFor="email">
                <b>Email</b><br />
                <input onChange={handleForm} type="text" name="email" value={form.email} />
            </label><br /><br />
            <label htmlFor="password">
                <b>Password</b><br />
                <input onChange={handleForm} type="password" name="password" value={form.password} />
            </label><br /><br />
            <button type="submit" className="button expanded">
                Sign Up
            </button>
            <p style={errorStyle}>{errorMessage}</p>
        </form>
    );
}

export default Signup;
