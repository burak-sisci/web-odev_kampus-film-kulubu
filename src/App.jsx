// src/App.jsx

import React from 'react';
import Home from './pages/Home'; // Home sayfasını import et

function App() {
  // Şimdilik sadece Home sayfasını gösteriyoruz.
  // İleride buraya yönlendirme (routing) mantığı gelebilir.
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
