import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBodyById } from "../../API";

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
                </div>
            )}
        </>
    );
}

export default Show;