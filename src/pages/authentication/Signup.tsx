import { registerUser } from '../../services/APIService/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthService';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = await registerUser(form.name, form.email, form.password);
            onAuthenticated(true, data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage(error);
        }
    };
    

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <h2>Sign Up</h2>
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
        </>
    );
}

export default Signup;
