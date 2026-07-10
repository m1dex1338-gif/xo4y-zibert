import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Будь ласка, заповніть обов'язкові поля (Ім'я, Телефон та Повідомлення).");
      return;
    }

    setLoading(true);
    const toastId = toast.info('Надсилання повідомлення...', { autoClose: false });

    fetch('/shop/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      })
    })
      .then(res => {
        toast.dismiss(toastId);
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Помилка відправки повідомлення.');
          });
        }
        return res.json();
      })
      .then(data => {
        toast.success('Повідомлення успішно надіслано! Ми зв\'яжемося з вами найближчим часом.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      })
      .catch(err => {
        toast.error(`Не вдалося надіслати повідомлення: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
                    <p className="text-muted mb-0">м. Виноградів, вул. Станційна, 16</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="icon-box me-4 text-dark">
                    <i className="bi bi-telephone-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Телефон</h6>
                    <p className="text-muted mb-0">+38 066 019 90 61</p>
                  </div>
                </div>

                <div className="d-flex mb-5">
                  <div className="icon-box me-4 text-dark">
                    <i className="bi bi-envelope-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">info@ngs-furniture.com.ua</p>
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
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-muted">Ваше Ім'я *</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="Іван" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted">Телефон *</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="+380..." 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted">Email (необов'язково)</label>
                      <input 
                        type="email" 
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="email@example.com" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted">Повідомлення *</label>
                      <textarea 
                        className="form-control form-control-lg bg-light border-0" 
                        rows="5" 
                        placeholder="Напишіть ваше запитання..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-dark btn-lg w-100 rounded-pill"
                        disabled={loading}
                      >
                        {loading ? 'Надсилання...' : 'Відправити'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
}

export default Contact;
