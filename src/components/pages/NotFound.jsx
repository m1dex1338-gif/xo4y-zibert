import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-5 my-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <h1 className="fw-bold display-1 text-dark mb-3">404</h1>
      <h3 className="fw-bold mb-4">Сторінку не знайдено</h3>
      <p className="text-muted lead mb-5" style={{ maxWidth: '500px' }}>
        Схоже, такої сторінки не існує. Можливо, посилання застаріло, або адреса була введена з помилкою.
      </p>
      <Link to="/" className="btn btn-dark px-5 py-3 rounded-pill fw-bold">
        <i className="bi bi-house-door-fill me-2"></i>Повернутися на головну
      </Link>
    </div>
  );
}

export default NotFound;
