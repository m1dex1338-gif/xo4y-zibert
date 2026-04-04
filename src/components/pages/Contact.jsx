import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <>
      <ol className="section-banner py-3 position-relative mt-5">
        <li className="position-relative"><Link to="/">Головна</Link></li>
        <li className="position-relative active"><span className="ps-5">Контакти</span></li>
      </ol>

      <div className="container py-5 my-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h1 className="fw-bold mb-4 display-6">Зв'яжіться з нами</h1>
            <p className="text-muted lead">Ми завжди раді відповісти на ваші запитання та допомогти з вибором меблів.</p>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-5">
            <div className="card border-0 bg-light rounded-4 h-100">
              <div className="card-body p-5">
                <h4 className="fw-bold mb-5">Контактна інформація</h4>
                
                <div className="d-flex mb-4">
                  <div className="icon-box me-4 text-dark">
                    <i className="bi bi-geo-alt-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Адреса</h6>
                    <p className="text-muted mb-0">м. Київ, вул. Меблева, 15</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="icon-box me-4 text-dark">
                    <i className="bi bi-telephone-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Телефон</h6>
                    <p className="text-muted mb-0">+38 099 123 45 67</p>
                  </div>
                </div>

                <div className="d-flex mb-5">
                  <div className="icon-box me-4 text-dark">
                    <i className="bi bi-envelope-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">info@vsedlyadomu.com</p>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">Соціальні мережі</h6>
                <div className="d-flex gap-3">
                  <a href="#" className="btn btn-outline-dark rounded-circle" style={{width: '45px', height:'45px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="btn btn-outline-dark rounded-circle" style={{width: '45px', height:'45px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="btn btn-outline-dark rounded-circle" style={{width: '45px', height:'45px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <i className="bi bi-telegram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-5">
                <h4 className="fw-bold mb-4">Залишити повідомлення</h4>
                <form>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-muted">Ваше Ім'я</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Іван" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted">Телефон</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="+380..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted">Email (необов'язково)</label>
                      <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="email@example.com" />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted">Повідомлення</label>
                      <textarea className="form-control form-control-lg bg-light border-0" rows="5" placeholder="Напишіть ваше запитання..."></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="button" className="btn btn-dark btn-lg w-100 rounded-pill" onClick={(e) => {
                          e.preventDefault();
                          alert('Форма відправлена! Ми зв\'яжемося з Вами найближчим часом.');
                      }}>
                        Відправити
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
