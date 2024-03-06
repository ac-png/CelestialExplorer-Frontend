import { getUserData } from '../services/APIService/auth';
import { useEffect, useState } from "react";

function User () {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            getUserData(token)
                .then(user => setUser(user))
                .catch(err => console.error(err));
        }
    }, []);

    // Function to format the date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Email Verification: {user.email_verified_at ? "Verified" : "Not Verified"}</p>
                    <p>Account Created: {formatDateTime(user.created_at)}</p>
                    <p>Account Updated: {formatDateTime(user.updated_at)}</p>
                    <button className='delete-button'>Delete Account</button>
                </div>
            )}
        </>
    );
}

export default User;
