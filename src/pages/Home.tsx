import { useAuth } from '../services/AuthService';

function Home() {
    const { authenticated, onAuthenticated } = useAuth();

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen sm:items-center py-4 sm:pt-0">
                {authenticated ? (
                    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                        <a href="/celestial-bodies" className="p-5">CelestialBodies</a>&emsp;
                        <a href="/dashboard/observations" className="p-5">Observations</a>&emsp;
                    </div>
                ) : (
                    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                        <a href="/login" className="p-5">Login</a>&emsp;
                        <a href="/signup" className="p-5">Signup</a>&emsp;
                    </div>
                )}
                <h1 className="text-5xl">
                    CelestialExplorer
                </h1>
            </div>
        </>
    );
}

export default Home;
