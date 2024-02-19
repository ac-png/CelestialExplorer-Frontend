import { useState, useEffect } from 'react';
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
