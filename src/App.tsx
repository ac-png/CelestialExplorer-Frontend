import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from './services/AuthService';

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserInfo from "./pages/UserInfo";
import Index from "./pages/observations/Index";
import Create from "./pages/observations/Create";
import Edit from "./pages/observations/Edit";
import BodyIndex from "./pages/celestialBodies/Index";
import BodyShow from "./pages/celestialBodies/Show";
import NotFound from "./pages/NotFound";

function App() {
  const { authenticated, onAuthenticated } = useAuth();
  
  let protectedRoutes;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      onAuthenticated(true);
    }
  });

  if(authenticated){
    protectedRoutes = (
      <>
        <Route key='/user' path='/user' element={<UserInfo />} />
        <Route key='/dashboard/observations' path='/dashboard/observations' element={<Index />} />
        <Route key='/dashboard/observations/create' path='/dashboard/observations/create' element={<Create />} />
        <Route key='/dashboard/observations/edit/:uuid' path='/dashboard/observations/edit/:uuid' element={<Edit />} />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/celestial-bodies' element={<BodyIndex />} />
          <Route path='/celestial-bodies/:id' element={<BodyShow />} />
          {protectedRoutes}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
