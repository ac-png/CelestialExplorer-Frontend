import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/api/auth/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
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
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            Email: <input onChange={handleForm} type="text" name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />

            <button onClick={handleSubmit}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
}

export default Login;
