// src/pages/Home.jsx

import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// Bileşenleri import et
import SearchBox from '../components/SearchBox';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Footer from '../components/Footer';

// 1. Başlangıç Durumu (Initial State)
const initialState = {
  loading: true,
  error: null,
  shows: [],
  query: 'friends', // Başlangıç arama sorgusu
  watchlist: [],
};

// 2. Reducer Fonksiyonu (State Güncelleme Merkezi)
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, shows: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'ADD_WATCHLIST':
      if (state.watchlist.find(item => item.show.id === action.payload.show.id)) {
        return state; // Zaten varsa değişiklik yapma
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.show.id !== action.payload),
      };
    default:
      return state;
  }
};

// 3. Ana Sayfa Bileşeni
function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4. API'den Veri Çekme (useEffect)
  useEffect(() => {
    if (!state.query.trim()) {
      dispatch({ type: 'FETCH_SUCCESS', payload: [] });
      return;
    }
    dispatch({ type: 'FETCH_INIT' });
    axios.get(`https://api.tvmaze.com/search/shows?q=${state.query}` )
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      });
  }, [state.query]);

  // 5. Olay Yöneticileri (Event Handlers)
  const handleSearch = (newQuery) => {
    dispatch({ type: 'SET_QUERY', payload: newQuery });
  };

  const handleAddWatchlist = (show) => {
    dispatch({ type: 'ADD_WATCHLIST', payload: show });
  };

  const handleRemoveWatchlist = (showId) => {
    dispatch({ type: 'REMOVE_WATCHLIST', payload: showId });
  };

  // 6. Arayüz (JSX)
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Kampüs Film Kulübü</h1>
      <SearchBox onSearch={handleSearch} initialQuery={state.query} />
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        <div style={{ flex: 3 }}>
          {state.loading ? (
            <p>Yükleniyor...</p>
          ) : state.error ? (
            <p>Hata: {state.error}</p>
          ) : (
            <TVList shows={state.shows} onAddWatchlist={handleAddWatchlist} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <WatchlistPanel watchlist={state.watchlist} onRemove={handleRemoveWatchlist} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
