import { useState } from 'react';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", form);
    };

    return (
        <form onSubmit={handleSubmit}>
            Email:<br />
            <input type="text" name="email" value={form.email} onChange={handleChange} /> <br />
            Password:<br />
            <input type="password" name="password" value={form.password} onChange={handleChange} /><br /><br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;
