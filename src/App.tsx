import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import CelestialBodyIndex from './pages/celestialObjects/Index';
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/celestial_bodies' element={<CelestialBodyIndex />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
      </>
    </Router>
  );
}

export default App;