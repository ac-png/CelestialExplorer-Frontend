import { useState, useEffect } from "react";
import { fetchBodies } from "../../services/APIService/bodies";
import BodyCard from "../../components/BodyCard";

function Index() {
    const [bodies, setBodies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBodyType, setSelectedBodyType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBodies()
        .then((bodies) => {
            setBodies(bodies);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const filteredBodies = bodies.filter((body) =>
        body.englishName.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
        (selectedBodyType === "" || body.bodyType.toLowerCase() === selectedBodyType.toLowerCase())
    );

    const bodyTypes = Array.from(new Set(bodies.map(body => body.bodyType)));


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h2>Celestial Bodies</h2>
            <form>
                <div className='legend'>
                    <ul>
                        {bodyTypes.map((type, index) => (
                            <li key={index} className={`${type.toLowerCase()}`}>
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <input 
                    id="searchInput"
                    type="text"
                    placeholder="Search for a celestial body"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search"
                />
                <select id="bodyTypeSelect" onChange={(e) => setSelectedBodyType(e.target.value)} value={selectedBodyType}>
                    <option value="">All</option>
                    {bodyTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </form>
            <div className="body-grid">
                {filteredBodies.map((body) => (
                    <div key={body.id} className={`body-card-container ${body.bodyType.toLowerCase()}`}>
                        <BodyCard
                            id={body.id}
                            englishName={body.englishName}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Index;
