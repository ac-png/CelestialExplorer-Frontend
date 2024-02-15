import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Index() {
    const [bodies, setBodies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredBodies = bodies.filter((body) =>
    body.englishName.toLowerCase().startsWith(searchTerm.toLowerCase())
);

    const bodyList = filteredBodies.map(body => {
        return (
            <div key={body.id}>
                <Link to={`/celestial_bodies/${body.id}`}>{body.englishName}</Link>
                <hr />
            </div>
        );
    });

    return (
        <>
            <h1>Celestial Bodies</h1>
            <form>
                <input 
                    type="text"
                    placeholder="Search for a celestial body"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form> 
            { bodyList }
        </>
    );
}

export default Index;