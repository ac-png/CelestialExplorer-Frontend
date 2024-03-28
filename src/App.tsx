import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from './services/AuthService';

import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserInfo from "./pages/UserInfo";
import Index from "./pages/observations/Index";
import Create from "./pages/observations/Create";
import BodyIndex from "./pages/celestialBodies/Index";

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
        <Route path='/dashboard/observations' element={<Index />} />
        <Route path='/dashboard/observations/create' element={<Create />} />
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
          {protectedRoutes}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
