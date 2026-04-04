import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <ol className="section-banner py-3 position-relative mt-5">
        <li className="position-relative"><Link to="/">Головна</Link></li>
        <li className="position-relative active"><span className="ps-5">Про нас</span></li>
      </ol>

      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="fw-bold mb-4 display-5">Про компанію Все для дому</h1>
            <p className="lead text-muted mb-5">
              Ми створюємо більше, ніж просто меблі. Ми формуємо простір, де народжується натхнення, комфорт та ваші найкращі спогади.
            </p>
          </div>
        </div>

        <div className="row g-5 align-items-center mt-3">
          <div className="col-lg-6">
            <div className="position-relative overflow-hidden rounded-4 shadow-sm" style={{ height: '400px', backgroundColor: '#f5f5f5' }}>
              {/* Зглушка для фото */}
              <div className="d-flex w-100 h-100 align-items-center justify-content-center bg-light text-muted">
                <i className="bi bi-image" style={{ fontSize: '4rem' }}></i>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="fw-bold mb-3">Наша філософія — мінімалізм і функціональність</h3>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              Меблі Все для дому розроблені з урахуванням сучасних тенденцій дизайну інтер'єру. Ми віримо, що естетика не повинна поступатися ергономіці. Кожна деталь продумана так, щоб служити довго і радувати око щодня.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Лише екологічні та сертифіковані матеріали.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Суворий контроль якості на всіх етапах виробництва.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Гарантія на кожну одиницю продукції.</span>
              </li>
            </ul>
            <Link to="/categories" className="btn btn-dark px-4 py-2 rounded-pill">Перейти до каталогу</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
