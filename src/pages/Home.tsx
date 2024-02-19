import { useState, useEffect } from 'react';
import { fetchKnownCount } from '../API';

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
            <h2>Known Count</h2>
            {countList}
        </>
    );
}

export default Home;
