// src/components/SearchBox.jsx
import React, { useState } from 'react';

function SearchBox({ onSearch, initialQuery }) {
  const [term, setTerm] = useState(initialQuery);

  const handleSubmit = (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini engelle
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Dizi ara..."
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px' }}>Ara</button>
    </form>
  );
}
export default SearchBox;
