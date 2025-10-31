// src/components/WatchlistPanel.jsx
import React from 'react';

function WatchlistPanel({ watchlist, onRemove }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px' }}>
      <h2>Gösterime Girecekler ({watchlist.length})</h2>
      {watchlist.length === 0 ? (
        <p>Listeniz boş.</p>
      ) : (
        <ul>
          {watchlist.map(item => (
            <li key={item.show.id} style={{ marginBottom: '10px' }}>
              {item.show.name}
              <button onClick={() => onRemove(item.show.id)} style={{ marginLeft: '10px' }}>Kaldır</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default WatchlistPanel;
