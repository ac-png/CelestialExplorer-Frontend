import { useParams } from "react-router-dom";
import { fetchBodyById } from '../../services/APIService/bodies';
import { useEffect, useState } from "react";

function Show() {
    let { id } = useParams();
    const [body, setBody] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

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
    }, [id]);

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
                    <div className="bg-gray-800 shadow-md rounded-md p-6">
                        <h1 className="text-center text-xl font-bold mb-4">{body.englishName}</h1>
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
                </div>
            </div>
        </div>
    );
}

export default Show;