import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
const [photo, setPhoto] = useState(null);
const [counts, setCounts] = useState([]);

useEffect(() => {
    axios
    .get('https://api.le-systeme-solaire.net/rest/knowncount')
    .then((response) => {
        // console.log(response.data.knowncount);
        setCounts(response.data.knowncount);
    })
    .catch((error) => {
        console.log(error);
    });
}, []);

useEffect(() => {
    axios
    .get('https://api.nasa.gov/planetary/apod?api_key=niz11pa6Xj1H0HrJijvK3jGR72Lf9XGmXsa9bdsS')
    .then((response) => {
        // console.log(response.data);
        setPhoto(response.data);
    })
    .catch((error) => {
        console.log(error);
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
        {photo && (
            <div>
            {photo.media_type === 'image' ? (
                <img
                src={photo.url}
                alt={photo.title}
                style={{ width: '200px', height: 'auto' }}
                />
            ) : (
                <iframe
                width="560"
                height="315"
                src={photo.url}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                ></iframe>
            )}
            </div>
        )}
        <h2>Known Count</h2>
        {countList}
    </>
);
}

export default Home;
