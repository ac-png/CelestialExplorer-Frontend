import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <h1>CelestialExplorer</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/celestial_bodies'>Celestial Bodies</Link></li>
            </ul>
        </>
    );
}

export default Navbar;