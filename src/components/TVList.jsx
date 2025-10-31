// src/components/TVList.jsx
import React from 'react';
import TVCard from './TVCard';

function TVList({ shows, onAddWatchlist }) {
  if (shows.length === 0) {
    return <p>Sonuç bulunamadı.</p>;
  }
  return (
    <div>
      {shows.map((item) => (
        <TVCard key={item.show.id} show={item} onAddWatchlist={onAddWatchlist} />
      ))}
    </div>
  );
}
export default TVList;
