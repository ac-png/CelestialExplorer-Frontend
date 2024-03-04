import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBodies } from "../../services/APIService/bodies";

function Index() {
    const [bodies, setBodies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchBodies()
        .then((bodies) => {
            setBodies(bodies);
        })
        .catch((error) => {
            console.error('Error setting known count:', error);
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
            <h2>Celestial Bodies</h2>
            <form>
                <input 
                    type="text"
                    placeholder="Search for a celestial body"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form><br />
            { bodyList }
        </>
    );
}

export default Index;