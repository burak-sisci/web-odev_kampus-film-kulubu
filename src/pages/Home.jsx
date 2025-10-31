// src/pages/Home.jsx

import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// Bileşenleri import et
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Pagination from '../components/Pagination'; // YENİ: Pagination bileşenini import et
import Footer from '../components/Footer';

// Başlangıç Durumu
const initialState = {
  loading: true,
  error: null,
  shows: [],
  query: 'friends',
  watchlist: [],
  filters: { genre: 'All', language: 'All' },
  // YENİ: Sayfalama için state
  pagination: { currentPage: 1, pageSize: 6 },
};

// Reducer Fonksiyonu
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, shows: action.payload, pagination: { ...state.pagination, currentPage: 1 } }; // YENİ: Yeni veri geldiğinde sayfayı 1'e sıfırla
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, pagination: { ...state.pagination, currentPage: 1 } }; // YENİ: Filtre değiştiğinde sayfayı 1'e sıfırla
    // YENİ: Sayfa numarasını değiştiren action
    case 'SET_PAGE':
      return { ...state, pagination: { ...state.pagination, currentPage: action.payload } };
    case 'ADD_WATCHLIST':
      if (state.watchlist.find(item => item.show.id === action.payload.show.id)) return state;
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_WATCHLIST':
      return { ...state, watchlist: state.watchlist.filter(item => item.show.id !== action.payload) };
    default:
      return state;
  }
};

// Ana Sayfa Bileşeni
function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // API'den Veri Çekme (Değişiklik yok)
  useEffect(() => {
    if (!state.query.trim()) {
      dispatch({ type: 'FETCH_SUCCESS', payload: [] });
      return;
    }
    dispatch({ type: 'FETCH_INIT' });
    axios.get(`https://api.tvmaze.com/search/shows?q=${state.query}` )
      .then(response => dispatch({ type: 'FETCH_SUCCESS', payload: response.data }))
      .catch(error => dispatch({ type: 'FETCH_FAILURE', payload: error.message }));
  }, [state.query]);

  // Olay Yöneticileri
  const handleSearch = (newQuery) => dispatch({ type: 'SET_QUERY', payload: newQuery });
  const handleAddWatchlist = (show) => dispatch({ type: 'ADD_WATCHLIST', payload: show });
  const handleRemoveWatchlist = (showId) => dispatch({ type: 'REMOVE_WATCHLIST', payload: showId });
  const handleFilterChange = (filter) => dispatch({ type: 'SET_FILTERS', payload: filter });
  // YENİ: Sayfa değiştirme handler'ı
  const handlePageChange = (page) => dispatch({ type: 'SET_PAGE', payload: page });

  // Filtrelenmiş Dizi Listesi (Değişiklik yok)
  const filteredShows = state.shows.filter(item => {
    const { genre, language } = state.filters;
    const show = item.show;
    const genreMatch = genre === 'All' || (show.genres && show.genres.includes(genre));
    const languageMatch = language === 'All' || show.language === language;
    return genreMatch && languageMatch;
  });

  // YENİ: Sayfalanmış Dizi Listesi
  const { currentPage, pageSize } = state.pagination;
  const totalShows = filteredShows.length;
  const totalPages = Math.ceil(totalShows / pageSize);
  const paginatedShows = filteredShows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Kampüs Film Kulübü</h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
        <SearchBox onSearch={handleSearch} initialQuery={state.query} />
        <Filters onFilterChange={handleFilterChange} />
      </div>
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        <div style={{ flex: 3 }}>
          {state.loading ? (
            <p>Yükleniyor...</p>
          ) : state.error ? (
            <p>Hata: {state.error}</p>
          ) : (
            <>
              {/* YENİ: TVList'e sayfalanmış dizileri gönder */}
              <TVList shows={paginatedShows} onAddWatchlist={handleAddWatchlist} />
              {/* YENİ: Pagination bileşenini ekle */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
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
