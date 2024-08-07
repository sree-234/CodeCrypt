import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

import Study from "./pages/Study";

import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/study" element={<Study />}></Route>

          <Route path="/encrypt" element={<Encrypt />}></Route>
          <Route path="/decrypt" element={<Decrypt />}></Route>

          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
