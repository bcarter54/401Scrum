import { useState } from 'react'

import './App.css'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideosPage from "./pages/VideosPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </Router>
  );
};






export default App
