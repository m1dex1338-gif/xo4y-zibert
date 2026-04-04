import React from 'react';
import { Link } from 'react-router-dom';

function Shipping() {
  return (
    <>
      <ol className="section-banner py-3 position-relative mt-5">
        <li className="position-relative"><Link to="/">Головна</Link></li>
        <li className="position-relative active"><span className="ps-5">Доставка і оплата</span></li>
      </ol>

      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-5 text-center display-6">Доставка і оплата</h1>
            
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-5">
                <h3 className="fw-bold mb-4"><i className="bi bi-truck me-3"></i>Доставка</h3>
                <p className="text-muted mb-4">
                  Ми пропонуємо кілька зручних способів доставки, щоб ви могли отримати своє замовлення якнайшвидше і в найкращому вигляді:
                </p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item d-flex align-items-center py-3 px-0 border-0">
                    <i className="bi bi-geo-alt fs-4 me-3 text-secondary"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Самовивіз зі складу</h6>
                      <p className="text-muted mb-0 small">Безкоштовно. м. Київ, вул. Меблева, 15.</p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center py-3 px-0 border-0 border-top">
                    <i className="bi bi-box-seam fs-4 me-3 text-secondary"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Доставка по місту</h6>
                      <p className="text-muted mb-0 small">Вартість від 500 ₴. Доставка до під'їзду.</p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center py-3 px-0 border-0 border-top">
                    <i className="bi bi-signpost-2 fs-4 me-3 text-secondary"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Поштові служби по Україні</h6>
                      <p className="text-muted mb-0 small">Нова Пошта, Делівері. За тарифами перевізника.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-5">
                <h3 className="fw-bold mb-4"><i className="bi bi-credit-card me-3"></i>Оплата</h3>
                <p className="text-muted mb-4">
                  Оплата здійснюється тільки після підтвердження замовлення нашим менеджером:
                </p>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-4 bg-light rounded-4 h-100">
                      <h6 className="fw-bold">Готівкою</h6>
                      <p className="text-muted small mb-0">Оплата при отриманні під час самовивозу або доставці кур'єром.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 bg-light rounded-4 h-100">
                      <h6 className="fw-bold">Безготівковий розрахунок</h6>
                      <p className="text-muted small mb-0">Переказ на розрахунковий рахунок ФОП. Ми надішлемо вам реквізити.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
