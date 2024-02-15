import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import CelestialBodyIndex from './pages/celestialObjects/Index';
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/celestial_bodies' element={<CelestialBodyIndex />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
    </Router>
  );
}

export default App;