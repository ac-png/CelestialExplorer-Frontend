import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBodies } from "../../API";

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