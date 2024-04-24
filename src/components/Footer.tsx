import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    const showFooter = !['/', '/login', '/signup'].includes(location.pathname);

    return (
        <div>
            {showFooter && (
                <footer className="p-4 mt-5 bottom-0 w-full">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="w-full md:w-auto mb-4 md:mb-0">
                                <p>&copy; {new Date().getFullYear()} CelestialExplorer. All rights reserved.</p>
                            </div>
                            <div className="w-full md:w-auto">
                                <ul className="flex justify-center md:justify-end space-x-4">
                                    <li><Link to='/celestial-bodies' className="hover:text-gray-400">CelestialBodies</Link></li>
                                    <li><Link to='/dashboard/observations' className="hover:text-gray-400">Observations</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Footer;
