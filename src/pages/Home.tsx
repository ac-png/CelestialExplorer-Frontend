import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
    const [objects, setObjects] = useState([]);
    const [photo, setPhoto] = useState(null); 
    
    useEffect(() => {
        axios
            .get(`https://api.le-systeme-solaire.net/rest/knowncount`)
            .then((response) => {
                console.log(response.data.knowncount);
                setObjects(response.data.knowncount);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=niz11pa6Xj1H0HrJijvK3jGR72Lf9XGmXsa9bdsS`)
            .then((response) => {
                console.log(response.data);
                setPhoto(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const objectList = objects.map(object => {
        return (
            <div key={object.id}>
                <p>{object.id}</p>
                <p>{object.knownCount}</p>
                <hr />
            </div>
        );
    });

    return (
        <>
            {photo && (
                <img
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: '200px', height: 'auto' }}
                />
            )}
            <h2>Known Count</h2>
            { objectList }
        </>
    );
    
}

export default Home;