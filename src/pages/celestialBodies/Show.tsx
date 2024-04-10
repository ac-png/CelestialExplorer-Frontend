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

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <h1 className="text-center text-5xl font-bold mb-5">{body.englishName}</h1>
                    <div className="bg-gray-800 shadow-md rounded-md p-6">
                        <div className="grid grid-cols-2">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <p><span className="font-bold">Body Type:</span> {body.bodyType || "N/A"}</p>
                                    <p><span className="font-bold">Dimension:</span> {body.dimension || "N/A"}</p>
                                    {body.moons && body.moons.length > 0 ? (
                                        <p>
                                            <span className="font-bold">Moons:</span> {body.moons.map((moon, index) => moon.moon).join('. ')}
                                        </p>
                                    ) : (
                                        <p>
                                            <span className="font-bold">Moons:</span> N/A
                                        </p>
                                    )}
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
                    <h1 className="text-2xl font-bold mt-5">Observations</h1>
                    <div className="bg-gray-800 shadow-md rounded-md p-6 mt-5" style={{ display: 'inline-block' }}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : observations.length === 0 ? (
                            <div>
                                <div className="text-center">
                                    <p className="text-red-600 text-2xl font-bold mb-4">No Observations Found!</p>
                                    <p className="mb-8">Start by creating a new observation.</p>
                                    <a href="/dashboard/observations/create" className="mb-4 px-4 py-2 border border-green-200 text-green-700 rounded-md btn-link btn-lg mb-2">Create New Observation</a>
                                </div>
                            </div>
                        ) : (
                            observations.map((observation) => (
                                observations.map((observation) => (
                                    <div className="mt-5" key={observation.id}>
                                        <p className="mt-2">
                                            <strong>Description: </strong>{observation.description}
                                        </p>
                                        <p className="flex items-center">
                                            <strong>Rating: </strong><Rating className="block mt-2 opacity-70" style={{ maxWidth: 250 }} value={observation.rating} readOnly />
                                        </p>
                                        <span className="block mt-2 text-sm opacity-70">{formatDate(observation.date)} {formatTime(observation.time)}</span>
                                        <Link to={`/dashboard/observations/edit/${observation.uuid}`} className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mr-3 focus-visible:outline-indigo-600"><i className="fa-solid fa-pencil mr-3"></i>Edit</Link>
                                        <button className="mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mr-3 focus-visible:outline-indigo-600" onClick={() => handleDelete(observation.uuid)}><i className="fa-solid fa-trash mr-2"></i>Delete</button>
                                    </div>
                                ))
                                
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;