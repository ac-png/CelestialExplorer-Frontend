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
                <div className="bg-white overflow-hidden">
                    <div className="p-6 bg-gray-800">
                        <h1 className="text-3xl font-bold mb-4">{body.englishName}</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p><strong>Body Type:</strong> {body.bodyType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;
