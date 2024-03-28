import { useEffect, useState } from "react";
import { fetchBodies } from '../../services/APIService/bodies';
import { Link } from 'react-router-dom';

function Index() {
    const [bodies, setBodies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBodyType, setSelectedBodyType] = useState(null);

    useEffect(() => {
        fetchBodies()
        .then((response) => {
            if (response && response.message === "No bodies found!") {
                setBodies([]);
            } else {
                const sortedBodies = response.sort((a, b) => a.englishName.localeCompare(b.englishName));
                setBodies(sortedBodies);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching bodies:', error);
            setIsLoading(false);
        });
    }, []);

    function getBodyTypeClassName(bodyType) {
        switch (bodyType.toLowerCase()) {
            case 'dwarf planet':
                return 'dwarf-planet';
            case 'planet':
                return 'planet';
            case 'star':
                return 'star';
            case 'moon':
                return 'moon';
            case 'comet':
                return 'comet';
            case 'asteroid':
                return 'asteroid';
            default:
                return '';
        }
    }

    function handleBodyTypeClick(bodyType) {
        setSelectedBodyType(bodyType === selectedBodyType ? null : bodyType);
    }

    return (
        <>
            <div className="px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : bodies.length === 0 ? (
                    <p>No Observations Found</p>
                ) : (
                    <>
                        <div>
                            <ul className="mt-5 grid grid-cols-3 gap-4 mt-3">
                                <li className="font-bold text-center p-3" onClick={() => handleBodyTypeClick(null)}>All</li>
                                <li className="font-bold text-center p-3 dwarf-planet" onClick={() => handleBodyTypeClick('dwarf planet')}>Dwarf Planet</li>
                                <li className="font-bold text-center p-3 planet" onClick={() => handleBodyTypeClick('planet')}>Planet</li>
                                <li className="font-bold text-center p-3 star" onClick={() => handleBodyTypeClick('star')}>Star</li>
                                <li className="font-bold text-center p-3 moon" onClick={() => handleBodyTypeClick('moon')}>Moon</li>
                                <li className="font-bold text-center p-3 comet" onClick={() => handleBodyTypeClick('comet')}>Comet</li>
                                <li className="font-bold text-center p-3 asteroid" onClick={() => handleBodyTypeClick('asteroid')}>Asteroid</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight">
                                Celestial Bodies
                            </h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            {bodies.filter(body => !selectedBodyType || body.bodyType.toLowerCase() === selectedBodyType.toLowerCase()).map((body) => (
                                <Link to={`/celestial-bodies/${body.id}`} key={body.id}>
                                    <div key={body.id} className={`${getBodyTypeClassName(body.bodyType)} p-4 text-center`}>
                                        <h2 className="font-bold text-xl">{body.englishName}</h2>
                                        <h2>{body.bodyType}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Index;
