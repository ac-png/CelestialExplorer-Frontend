function Home () {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen sm:items-center py-4 sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    <a href="/login" className="p-5">Login</a>&emsp;
                    <a href="/signup" className="p-5">Signup</a>&emsp;
                </div>
                <h1 className="text-5xl">
                    CelestialExplorer
                </h1>
            </div>

        </>
    );
}

export default Home;
