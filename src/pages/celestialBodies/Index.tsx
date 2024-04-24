import { useEffect, useState } from "react";
import { fetchBodies } from '../../services/APIService/bodies';
import { Link } from 'react-router-dom';

function Index() {
    const [bodies, setBodies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBodyType, setSelectedBodyType] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
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
                            <ul className="mt-3 grid grid-cols-3 gap-4 mt-3">
                                <li className="font-bold text-center p-3 hover:opacity-70" onClick={() => handleBodyTypeClick(null)}>All</li>
                                <li className="font-bold text-center p-3 dwarf-planet hover:opacity-70" onClick={() => handleBodyTypeClick('dwarf planet')}>Dwarf Planet</li>
                                <li className="font-bold text-center p-3 planet hover:opacity-70" onClick={() => handleBodyTypeClick('planet')}>Planet</li>
                                <li className="font-bold text-center p-3 star hover:opacity-70" onClick={() => handleBodyTypeClick('star')}>Star</li>
                                <li className="font-bold text-center p-3 moon hover:opacity-70" onClick={() => handleBodyTypeClick('moon')}>Moon</li>
                                <li className="font-bold text-center p-3 comet hover:opacity-70" onClick={() => handleBodyTypeClick('comet')}>Comet</li>
                                <li className="font-bold text-center p-3 asteroid hover:opacity-70" onClick={() => handleBodyTypeClick('asteroid')}>Asteroid</li>
                            </ul>
                            <p>
                                <strong><i className="mr-2 fa-solid fa-magnifying-glass"></i>Search for Celestial Body:</strong>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="ml-3 mt-5 p-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    style={{ color: 'black' }}
                                />
                            </p>
                        </div>
                        <div>
                            <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight">
                                Celestial Bodies
                            </h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            {bodies.filter(body => 
                                (!selectedBodyType || body.bodyType.toLowerCase() === selectedBodyType.toLowerCase()) &&
                                (body.englishName.toLowerCase().startsWith(searchTerm.toLowerCase()))
                            ).map((body) => (
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
