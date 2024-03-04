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

    const countList = counts.map((count) => (
        <div key={count.id}>
            <p>{count.id}</p>
            <p>{count.knownCount}</p>
            <hr />
        </div>
    ));

    return (
        <>
            <h2>Home</h2>
            {countList}
        </>
    );
}

export default Home;
