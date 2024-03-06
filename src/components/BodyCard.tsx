import { Link } from "react-router-dom";
import { useState } from "react";

const BodyCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <Link 
            to={`/celestial_bodies/${props.id}`} 
            onMouseOver={() => setIsHovered(true)} 
            onMouseOut={() => setIsHovered(false)}
        >
            <div key={props.id}>
                <p><strong>{props.englishName}</strong></p>
            </div>
        </Link>
    );
}

export default BodyCard;
