import axios from "axios";
import { useState, useEffect } from "react";

function Index() {
    const [bodies, setBodies] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.le-systeme-solaire.net/rest/bodies`)
            .then((response) => {
                console.log(response.data.bodies);
                setBodies(response.data.bodies);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const bodyList = bodies.map(body => {
        return (
            <div key={body.id}>
                <p>{body.name}</p>
                <hr />
            </div>
        );
    });

    return (
        <>
            <h1>Celestial Bodies</h1>
            { bodyList }
        </>
    );
}

export default Index;