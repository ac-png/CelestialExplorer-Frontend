import { getUserData } from '../services/APIService/auth';
import { useEffect, useState } from "react";
import { formatDateTime } from '../utilities/format';

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
