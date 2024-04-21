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
            <div className="container mx-auto py-8">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold text-gray-800">User Information</h1>
                        <div className="mt-4">
                            <div className="flex items-center">
                                <img src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='mr-4 rounded-full' width={100} height={100} />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    {user.email_verified_at ? (
                                        <p className="text-sm text-green-600">Verified</p>
                                    ) : (
                                        <p className="text-sm text-red-600">Not Verified</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-gray-700 font-semibold">Registration Date:</h3>
                                <p className="mt-2 text-sm text-gray-600">{formatDateTime(user.created_at)}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-gray-700 font-semibold">Last Updated:</h3>
                                <p className="mt-2 text-sm text-gray-600">{formatDateTime(user.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default User;
