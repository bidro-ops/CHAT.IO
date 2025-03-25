import { useState } from 'react'

import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Parametres from "./pages/Parametres";
import  { useAuthStore } from './store/useAuthStore.js';
import Navbar from "./components/Navbar.jsx";
import {Loader} from "lucide-react";
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
useEffect(() => {
    checkAuth();
 }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return(  
  <div> 
  <Navbar />
  <Routes>
    <Route path="/" element={authUser? <Home /> : <Login /> }/>
    <Route path="/signup" element={!authUser? <Signup /> : <Navigate to="/" />}/>
    <Route path="/login" element={!authUser? <Login /> : <Navigate to="/" />} />
    <Route path="/parametres" element={<Parametres />} />
  </Routes>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </div>
  );  
}

export default App;
