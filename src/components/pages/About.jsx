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
            <h1 className="fw-bold mb-4 display-5">GNS FURNITURE</h1>
            <p className="lead text-muted mb-5">
              ваш експертний партнер у світі меблевої та дверної фурнітури
            </p>
          </div>
        </div>

        <div className="row g-5 align-items-center mt-3">
          <div className="col-lg-6">
            <div className="position-relative overflow-hidden rounded-4 shadow-sm" style={{ height: '400px', backgroundColor: '#f5f5f5' }}>
              {/* Зглушка для фото */}
              <div className="d-flex w-100 h-100 align-items-center justify-content-center bg-light text-muted">
                <img src="/Images/about_us.jpg" alt="Placeholder" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {/* <h3 className="fw-bold mb-3">Наша філософія — мінімалізм і функціональність</h3> */}
            <p className="fw-bold mb-4" style={{ lineHeight: '1.8' }}>
              {/* GNS FURNITURE — ваш експертний партнер у світі меблевої та дверної фурнітури з понад 10-річним досвідом. Ми не просто продаємо фурнітуру, ми підбираємо індивідуальні технічні рішення для вашого інтер'єру. */}
            </p>
            <ul className="list-unstyled mb-6">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Наш досвід: 10+ років бездоганної репутації.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Наш підхід: Цінуємо ваш час, надаючи фахові консультації та швидкий підбір.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Наша якість: Гарантуємо надійність кожного механізму.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-dark me-3 mt-1"></i>
                <span className="text-muted">Наш асортимент: Постійно оновлюємо каталог згідно з останніми трендами дизайну.</span>
              </li>
            </ul>
            <p className=" mb-4" style={{ lineHeight: '1.8' }}>
              Потрібна консультація? Зв’яжіться з нашим менеджером, щоб отримати детальну інформацію та оформити замовлення. Дякуємо, що обираєте нас! Сподіваємось на успішну та тривалу співпрацю.
            </p>
            <Link to="/categories" className="btn btn-dark px-4 py-2 rounded-pill">Перейти до каталогу</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
