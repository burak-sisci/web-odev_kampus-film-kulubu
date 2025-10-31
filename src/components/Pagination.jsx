// src/components/Pagination.jsx
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Eğer tek sayfa veya daha azı varsa, hiçbir şey gösterme

  const handleFirst = () => onPageChange(1);
  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);
  const handleLast = () => onPageChange(totalPages);

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <button onClick={handleFirst} disabled={currentPage === 1}>İlk</button>
      <button onClick={handlePrevious} disabled={currentPage === 1}>Geri</button>
      <span>Sayfa {currentPage} / {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>İleri</button>
      <button onClick={handleLast} disabled={currentPage === totalPages}>Son</button>
    </div>
  );
}

export default Pagination;
