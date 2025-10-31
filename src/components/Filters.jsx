// src/components/Filters.jsx
import React from 'react';

function Filters({ onFilterChange }) {
  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <select name="genre" onChange={(e) => onFilterChange({ genre: e.target.value })} style={{ padding: '10px' }}>
        <option value="All">Tüm Türler</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Action">Action</option>
        <option value="Thriller">Thriller</option>
        <option value="Science-Fiction">Science-Fiction</option>
      </select>
      <select name="language" onChange={(e) => onFilterChange({ language: e.target.value })} style={{ padding: '10px' }}>
        <option value="All">Tüm Diller</option>
        <option value="English">English</option>
        <option value="Japanese">Japanese</option>
        <option value="Korean">Korean</option>
      </select>
    </div>
  );
}

export default Filters;
