import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBodyById } from "../API";

function Show() {
    const { id } = useParams();
    const [body, setBody] = useState(null);

    useEffect(() => {
        fetchBodyById(id)
        .then((response) => {
            setBody(response);
        })
        .catch((error) => {
            console.error('Error setting body:', error);
        });
    }, [id]);

    if(!body) return <h3>Body not found</h3>

    return (
        <>
            {body && (
                <div>
                    <h2>{body.englishName}</h2>
                    <p>Is Planet: {body.isPlanet ? 'Yes' : 'No'} ({body.bodyType})</p>
                    {body.moons ? ( <p>Moons: {body.moons.map((moon, index) => (index ? ', ' : '') + `${moon.moon}` )}</p>) : ( <p>This body has no moons.</p> )}
                    <p>Semi-major Axis: {body.semimajorAxis}</p>
                    <p>Perihelion: {body.perihelion}</p>
                    <p>Aphelion: {body.aphelion}</p>
                    <p>Eccentricity: {body.eccentricity}</p>
                    <p>Inclination: {body.inclination}</p>
                    <p>Mass: {body.mass.massValue} x 10^{body.mass.massExponent} kg</p>
                    <p>Volume: {body.vol.volValue} x 10^{body.vol.volExponent} m³</p>
                    <p>Density: {body.density}</p>
                    <p>Gravity: {body.gravity}</p>
                    <p>Escape Velocity: {body.escape}</p>
                    <p>Mean Radius: {body.meanRadius}</p>
                    <p>Equatorial Radius: {body.equaRadius}</p>
                    <p>Polar Radius: {body.polarRadius}</p>
                    <p>Flattening: {body.flattening}</p>
                    <p>Dimension: {body.dimension}</p>
                    <p>Sidereal Orbit: {body.sideralOrbit}</p>
                    <p>Sidereal Rotation: {body.sideralRotation}</p>
                    <p>Discovered By: {body.discoveredBy}</p>
                    <p>Discovery Date: {body.discoveryDate}</p>
                    <p>Alternative Name: {body.alternativeName}</p>
                    <p>Axial Tilt: {body.axialTilt}</p>
                    <p>Average Temperature: {body.avgTemp}</p>
                    <p>Main Anomaly: {body.mainAnomaly}</p>
                    <p>Argument of Periapsis: {body.argPeriapsis}</p>
                    <p>Longitude of Ascending Node: {body.longAscNode}</p>
                </div>
            )}
        </>
    );
}

export default Show;