import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const items = savedCart ? JSON.parse(savedCart) : [];
    if (items.length === 0) {
      navigate('/cart');
    }
    setCartItems(items);
  }, [navigate]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^\d.-]/g, '')) 
      : item.price;
    return acc + (price * (item.quantity || 1));
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Будь ласка, заповніть обов\'язкові поля (Ім\'я та Телефон).');
      return;
    }
    
    // Тут буде логіка відправки в Telegram
    // Наприклад: API.sendTelegram(formData, cartItems, totalPrice)
    
    // Імітація успішного замовлення:
    toast.success('Замовлення успішно оформлено! Менеджер зв\'яжеться з вами найближчим часом.', {
      onClose: () => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/');
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ol className="section-banner py-3 position-relative mt-5">
        <li className="position-relative"><Link to="/cart">Кошик</Link></li>
        <li className="position-relative active"><span className="ps-5">Оформлення замовлення</span></li>
      </ol>

      <div className="container py-5 my-5">
        <h1 className="fw-bold mb-5 text-center display-6">Оформлення замовлення</h1>
        
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <h4 className="fw-bold mb-4">Деталі отримувача</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label text-muted">Ваше Ім'я *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="Введіть ваше ім'я" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted">Номер телефону *</label>
                  <input 
                    type="tel" 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="+380..." 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted">Коментар до замовлення</label>
                  <textarea 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="Додаткові побажання..."
                    rows="4"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="alert alert-info border-0 rounded-4 mt-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Оплата здійснюється після підтвердження замовлення нашим менеджером. Ми не вимагаємо оплату картою на сайті.
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-lg-5">
            <div className="card border-0 rounded-4 bg-light p-4 p-md-5 sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <h4 className="fw-bold mb-4">Ваше замовлення</h4>
              <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="d-flex align-items-center mb-3">
                    <img 
                      src={item.images ? item.images[0] : item.image} 
                      alt="" 
                      className="rounded-3 me-3" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 text-truncate" style={{ maxWidth: '200px' }}>{item.name || item.Productname}</h6>
                      <span className="text-muted small">{item.quantity || 1} шт.</span>
                    </div>
                    <div className="fw-bold ms-2">
                       {(((typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) : item.price) * (item.quantity || 1)).toFixed(2))} ₴
                    </div>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Всього до оплати:</span>
                <span className="fw-bold fs-3 text-dark">{totalPrice.toFixed(2)} ₴</span>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-dark w-100 py-3 rounded-pill fw-bold fs-5"
                onClick={handleSubmit}
              >
                Підтвердити замовлення
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
}

export default Checkout;
