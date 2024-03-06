import { Link } from "react-router-dom";

const BodyCard = (props) => {
    
    return (
        <Link 
            to={`/celestial_bodies/${props.id}`}
        >
            <div key={props.id} className="body-card-text">
                <p><strong>{props.englishName}</strong></p>
            </div>
        </Link>
    );
}

export default BodyCard;
