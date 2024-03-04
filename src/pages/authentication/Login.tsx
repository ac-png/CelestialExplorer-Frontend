import { loginUser } from '../../services/APIService/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthService';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = await loginUser(form.email, form.password);
            onAuthenticated(true, data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage(error);
        }
    };    

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login In</h2>
            <label htmlFor="email">Email:</label><br />
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={form.email} 
                onChange={handleForm} 
                required 
            /><br /><br />
            <label htmlFor="password">Password:</label><br />
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={form.password} 
                onChange={handleForm} 
                required 
            /><br /><br />
            <button type="submit">Log In</button><br />
            <p style={errorStyle}>{errorMessage}</p>
        </form>
    );
}

export default Login;
