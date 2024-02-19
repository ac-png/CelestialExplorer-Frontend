import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

import Home from './pages/Home';
import CelestialBodyIndex from './pages/celestialBodies/Index';
import CelestialBodyShow from './pages/celestialBodies/Show';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import UserInfo from "./pages/UserInfo";

import Navbar from "./components/Navbar";

function App() {
  const { authenticated, onAuthenticated } = useAuth();

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  });


  if(authenticated){
    protectedRoutes = (
      <>
        <Route path='/user' element={<UserInfo />} />
      </>
    );
  }

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
          {protectedRoutes}
        </Routes>
    </Router>
  );
}

export default App;