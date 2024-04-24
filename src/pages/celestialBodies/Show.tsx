import { useParams, Link } from "react-router-dom";
import { fetchBodyById } from '../../services/APIService/bodies';
import { fetchObservationByBody, deleteByUUID } from '../../services/APIService/observations';
import { useEffect, useState } from "react";
import { formatDate, formatTime } from '../../utilities/format';
import { Rating } from '../../../node_modules/@smastrom/react-rating/dist/index';

function Show() {
    let { id } = useParams();
    const [body, setBody] = useState(null);
    const [observations, setObservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        let token = localStorage.getItem('token');

        fetchBodyById(id)
        .then((response) => {
            if (response && response.message === "No bodies found!") {
                setBody([]);
            } else {
                setBody(response);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setIsLoading(false);
        });

        fetchObservationByBody(token, id)
        .then((data) => {
            setObservations(data);
        })
        .catch((error) => {
            console.error('Error fetching observations:', error);
        });
    }, [id]);

    const handleDelete = async (uuid) => {
        let token = localStorage.getItem('token');
        try {
            await deleteByUUID(token, uuid);
            fetchObservationByBody(token, id)
            .then(response => {
                setObservations(response);
            })
            .catch(error => {
                console.error('Error fetching observations after deletion:', error);
            });
        } catch (error) {
            console.error('Error deleting observation:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!body || body.length === 0) {
        return <div>No bodies found!</div>;
    }

    let imageUrl;
    switch (body.bodyType?.toLowerCase()) {
        case 'dwarf planet':
            imageUrl = 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHdhcmYlMjBwbGFuZXR8ZW58MHx8MHx8fDA%3D';
            break;
        case 'planet':
            imageUrl = 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhbmV0fGVufDB8fDB8fHww';
            break;
        case 'star':
            imageUrl = 'https://plus.unsplash.com/premium_photo-1670210080045-a2e0da63dd99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhcnxlbnwwfHwwfHx8MA%3D%3D';
            break;
        case 'moon':
            imageUrl = 'https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9vbnxlbnwwfHwwfHx8MA%3D%3D';
            break;
        case 'comet':
            imageUrl = 'https://images.unsplash.com/photo-1623284577359-a0130bb9a86d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        case 'asteroid':
            imageUrl = 'https://plus.unsplash.com/premium_photo-1679526019817-015be70a78bc?q=80&w=2220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        default:
            imageUrl = 'https://example.com/default-image.jpg';
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <div className="py-12 flex justify-center items-center">
                        <h1 className="text-center text-5xl font-bold mb-5">{body.englishName}</h1>
                        <img
                            src={imageUrl}
                            className="ml-5 rounded-lg"
                            alt=""
                            width={300}
                        />
                    </div>
                    <div className="bg-gray-800 shadow-md rounded-md p-6">
                        <div className="grid grid-cols-2">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <p><span className="font-bold">Body Type:</span> {body.bodyType || "N/A"}</p>
                                    <p><span className="font-bold">Dimension:</span> {body.dimension || "N/A"}</p>
                                    <p><span className="font-bold">Semi-Major Axis:</span> {body.semimajorAxis || "N/A"} km</p>
                                    <p><span className="font-bold">Perihelion:</span> {body.perihelion || "N/A"}</p>
                                    <p><span className="font-bold">Aphelion:</span> {body.aphelion || "N/A"}</p>
                                    <p><span className="font-bold">Eccentricity:</span> {body.eccentricity || "N/A"}</p>
                                    <p><span className="font-bold">Inclination:</span> {body.inclination || "N/A"}°</p>
                                    <p><span className="font-bold">Mass:</span> {body.mass ? `${body.mass.massValue} x 10^${body.mass.massExponent}` : "N/A"}</p>
                                    <p><span className="font-bold">Volume:</span> {body.vol ? `${body.vol.volValue} x 10^${body.vol.volExponent}` : "N/A"}</p>
                                    <p><span className="font-bold">Density:</span> {body.density || "N/A"}</p>
                                    <p><span className="font-bold">Gravity:</span> {body.gravity || "N/A"}</p>
                                    <p><span className="font-bold">Argument of Periapsis:</span> {body.argPeriapsis || "N/A"}</p>
                                    <p><span className="font-bold">Longitude of Ascending Node:</span> {body.longAscNode || "N/A"}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <p><span className="font-bold">Escape:</span> {body.escape || "N/A"}</p>
                                    <p><span className="font-bold">Mean Radius:</span> {body.meanRadius || "N/A"}</p>
                                    <p><span className="font-bold">Equatorial Radius:</span> {body.equaRadius || "N/A"}</p>
                                    <p><span className="font-bold">Polar Radius:</span> {body.polarRadius || "N/A"}</p>
                                    <p><span className="font-bold">Flattening:</span> {body.flattening || "N/A"}</p>
                                    <p><span className="font-bold">Sideral Orbit:</span> {body.sideralOrbit || "N/A"}</p>
                                    <p><span className="font-bold">Sideral Rotation:</span> {body.sideralRotation || "N/A"}</p>
                                    <p><span className="font-bold">Discovered By: </span><a href={`https://en.wikipedia.org/wiki/${body.discoveredBy || "N/A"}`}>
                                        {body.discoveredBy || "N/A"}
                                    </a></p>
                                    <p><span className="font-bold">Alternative Name:</span> {body.alternativeName || "N/A"}</p>
                                    <p><span className="font-bold">Axial Tilt:</span> {body.axialTilt || "N/A"}</p>
                                    <p><span className="font-bold">Average Temperature:</span> {body.avgTemp || "N/A"}</p>
                                    <p><span className="font-bold">Main Anomaly:</span> {body.mainAnomaly || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mt-5">Moons</h1>
                    {body.moons && body.moons.length > 0 ? (
                        <div className="bg-gray-800 shadow-md rounded-md p-6 mt-5 grid grid-cols-3 gap-4 mt-3">
                            {body.moons
                                .sort((a, b) => a.moon.localeCompare(b.moon))
                                .map((moon, index) => (
                                    <Link to={`/celestial-bodies/${moon.moon}`} key={index} className='p-4 text-center moon m-1'>
                                        <h2 className="font-bold text-xl">{moon.moon}</h2>
                                    </Link>
                                ))}
                        </div>
                    ) : (
                        <p className="bg-gray-800 shadow-md rounded-md p-6 mt-5">
                            <p className="text-red-600 text-2xl font-bold">This celestial body has no moons!</p>
                        </p>
                    )}
                    <h1 className="text-2xl font-bold mt-5">Observations</h1>
                    <div className="bg-gray-800 shadow-md rounded-md p-6 mt-5" style={{ display: 'inline-block' }}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : observations.length === 0 ? (
                            <div>
                                <div className="text-center">
                                    <p className="text-red-600 text-2xl font-bold mb-4">No Observations Found!</p>
                                    <p className="mb-8">Start by creating a new observation.</p>
                                    <a href="/dashboard/observations/create" className="mb-4 px-4 py-2 border border-green-600 text-green-600 rounded-md btn-link btn-lg mb-2 hover:bg-green-600 hover:text-gray-800">Create New Observation</a>
                                </div>
                            </div>
                        ) : (
                            observations.map((observation) => (
                                    <div key={observation.id}>
                                        <p className="mt-2">
                                            <strong>Description: </strong>{observation.description}
                                        </p>
                                        <p className="mt-2">
                                            <strong>Location: </strong>{observation.latitude}, {observation.longitude}
                                        </p>
                                        <p className="block mt-2"><strong>Date and Time: </strong>{formatDate(observation.date)} {formatTime(observation.time)}</p>
                                        <p className="flex items-center mb-3">
                                            <strong>Rating: </strong><Rating className="block mt-2 opacity-100" style={{ maxWidth: 250 }} value={observation.rating} readOnly />
                                        </p>
                                        <Link to={`/dashboard/observations/edit/${observation.uuid}`} className="px-4 border border-yellow-600 text-yellow-600 mr-3 py-2.5 rounded-md btn-link btn-lg mb-2 hover:bg-yellow-600 hover:text-gray-800"><i className="fa-solid fa-pencil mr-3"></i>Edit</Link>
                                        <button className="px-4 py-2 border border-red-600 text-red-600 mr-3 bg-gray-800 rounded-md btn-link btn-lg mb-2 hover:bg-red-600 hover:text-gray-800" onClick={() => handleDelete(observation.uuid)}><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                                    </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;