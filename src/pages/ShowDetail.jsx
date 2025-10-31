// src/pages/ShowDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ShowDetail() {
  const { id } = useParams(); // URL'den :id parametresini al
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // İki API isteğini aynı anda at
        const [showResponse, episodesResponse] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}` ),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes` )
        ]);
        setShow(showResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (err) {
        setError('Veri çekilirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // id her değiştiğinde yeniden veri çek

  if (loading) return <p>Detaylar yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!show) return <p>Dizi bulunamadı.</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', fontFamily: 'Arial' }}>
      <Link to="/">&larr; Ana Sayfaya Dön</Link>
      <h1>{show.name}</h1>
      <div style={{ display: 'flex', gap: '30px' }}>
        <img src={show.image ? show.image.original : 'https://via.placeholder.com/400x600'} alt={show.name} style={{ maxWidth: '300px' }} />
        <div>
          <p><b>Tür:</b> {show.genres.join(', ' )}</p>
          <p><b>Dil:</b> {show.language}</p>
          <p><b>Puan:</b> {show.rating.average || 'N/A'}</p>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>
      <h2 style={{ marginTop: '40px' }}>Bölümler ({episodes.length})</h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {episodes.map(ep => (
          <div key={ep.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            S{String(ep.season).padStart(2, '0')}E{String(ep.number).padStart(2, '0')}: <strong>{ep.name}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetail;
