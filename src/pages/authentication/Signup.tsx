import { useState } from 'react';

function Signup() {
    const [form, setForm] = useState({
        username: "",
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
            Username:<br />
            <input type="text" name="username" value={form.username} onChange={handleChange} /> <br />
            Email:<br />
            <input type="text" name="email" value={form.email} onChange={handleChange} /> <br />
            Password:<br />
            <input type="password" name="password" value={form.password} onChange={handleChange} /><br /><br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Signup;
