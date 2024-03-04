import { loginUser } from '../../apiRoutes/auth';
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
        <>
            <h2>Login In</h2>
            <b>Email</b><br />
            <input onChange={handleForm} type="text" name="email" value={form.email}  /><br /><br />
            <b>Password</b><br />
            <input onChange={handleForm} type="password" name="password" value={form.password} /><br /><br />
            <button onClick={handleSubmit}>Log In</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
}

export default Login;
