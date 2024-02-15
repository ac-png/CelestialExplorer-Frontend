import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Index() {
    const [bodies, setBodies] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.le-systeme-solaire.net/rest/bodies`)
            .then((response) => {
                console.log(response.data.bodies);
                const sortedBodies = [...response.data.bodies].sort((a, b) => a.name.localeCompare(b.name));
                setBodies(sortedBodies);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const bodyList = bodies.map(body => {
        return (
            <div key={body.id}>
                <Link to={`/celestial_bodies/${body.id}`}>{body.name}</Link>
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