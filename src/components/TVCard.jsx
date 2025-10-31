// src/components/TVCard.jsx
import React from 'react';

function TVCard({ show, onAddWatchlist }) {
  const { name, image, summary, rating } = show.show;
  const shortSummary = summary ? summary.split(' ').slice(0, 20).join(' ') + '...' : 'Özet mevcut değil.';
  
  return (
    <div style={{ display: 'flex', gap: '20px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <img src={image ? image.medium : 'https://via.placeholder.com/210x295'} alt={name} style={{ width: '100px' }} />
      <div>
        <h3>{name}</h3>
        <p><b>Puan:</b> {rating.average || 'N/A'}</p>
        <p dangerouslySetInnerHTML={{ __html: shortSummary }} />
        <button onClick={( ) => onAddWatchlist(show)} style={{ marginRight: '10px' }}>Kısa Listeye Ekle</button>
        <button>Detay</button>
      </div>
    </div>
  );
}
export default TVCard;
