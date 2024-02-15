import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import CelestialBodyIndex from './pages/celestialBodies/Index';
import CelestialBodyShow from './pages/celestialBodies/Show';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/celestial_bodies' element={<CelestialBodyIndex />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/celestial_bodies/:id' element={<CelestialBodyShow />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;