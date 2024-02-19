import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function User () {
    const { authenticated } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`http://localhost/api/auth/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response.data.user)
                setUser(response.data.user);
            })
            .catch(err => {
                console.error(err);
            })
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
                </div>
            )}
        </>
    );
}

export default User;
