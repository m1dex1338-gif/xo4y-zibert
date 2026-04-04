import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-footer mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-brand mb-4 fw-bold">Все для дому</h4>
            <p className="footer-text mb-4 text-muted">
              Високоякісні меблі для вашого комфорту та сучасного стилю життя. Мрійте, відпочивайте, насолоджуйтесь.
            </p>
            <div className="social-links d-flex gap-3">
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="footer-title fw-bold mb-4">Навігація</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/categories">Каталог</Link></li>
              <li><Link to="/wishlist">Список бажань</Link></li>
              <li><Link to="/cart">Кошик</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-title fw-bold mb-4">Інформація</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/about">Про нас</Link></li>
              <li><Link to="/shipping">Доставка і оплата</Link></li>
              <li><Link to="/returns">Повернення</Link></li>
              <li><Link to="/contact">Контакти</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title fw-bold mb-4">Контакти</h5>
            <ul className="footer-contact list-unstyled text-muted">
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-geo-alt-fill me-3 fs-5"></i>
                <span>м. Київ, вул. Меблева, 15</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-telephone-fill me-3 fs-5"></i>
                <span>+38 099 123 45 67</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope-fill me-3 fs-5"></i>
                <span>info@vsedlyadomu.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="row text-center">
          <div className="col-12">
            <p className="footer-copyright text-muted mb-0">
              &copy; {new Date().getFullYear()} Все для дому. Всі права захищено.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
