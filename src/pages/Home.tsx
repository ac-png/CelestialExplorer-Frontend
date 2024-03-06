import { useState, useEffect } from 'react';
import { fetchKnownCount } from '../services/APIService/bodies';

function Home() {
    const [counts, setCounts] = useState([]);

    useEffect(() => {
        fetchKnownCount()
        .then((knownCount) => {
            setCounts(knownCount);
        })
        .catch((error) => {
            console.error('Error setting known count:', error);
        });
    }, []);

    return (
        <div className="home-container">
            {counts.map((count, index) => (
                <div key={index} className="home-item">
                    <p>{count.id}</p>
                    <p>{count.knownCount}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
