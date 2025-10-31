// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';

function App() {
  return (
    <Routes>
      {/* Ana yol (/) Home sayfasını göstersin */}
      <Route path="/" element={<Home />} />
      
      {/* Detay yolu (/show/:id) ShowDetail sayfasını göstersin */}
      <Route path="/show/:id" element={<ShowDetail />} />
    </Routes>
  );
}

export default App;
