import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateQuantity = (id, type) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        if (type === 'increase') {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        } else if (type === 'decrease' && (item.quantity || 1) > 1) {
          return { ...item, quantity: (item.quantity || 1) - 1 };
        }
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.error('Товар видалено з кошика!');
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^\d.-]/g, '')) 
      : item.price;
    return acc + (price * (item.quantity || 1));
  }, 0);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to="/">Головна</Link></li>
        <li className="position-relative active"><span className="ps-5">Кошик</span></li>
      </ol>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Кошик</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="lead">Кошик порожній!</p>
            <Link to="/" className="btn btn-primary mt-3">Повернутися до покупок</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cartItems.map(item => (
                <div key={item.id} className="card shadow-sm border-0 rounded-4 mb-3 p-3 text-dark">
                  <div className="row align-items-center">
                    <div className="col-3 col-md-2">
                      <img src={item.image} alt={item.Productname} className="img-fluid rounded-3" />
                    </div>
                    <div className="col-9 col-md-10 d-flex flex-column flex-md-row justify-content-between align-items-center">
                      <div className="text-start w-100 ps-md-3">
                        <h5 className="mb-2">{item.Productname}</h5>
                        <p className="text-muted mb-1">Ціна: {item.price}</p>
                        <p className="text-muted mb-1 fw-bold">
                          Всього: ${(parseFloat(String(item.price).replace(/[^\d.-]/g, '')) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                        <div className="input-group input-group-sm" style={{ width: '120px' }}>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                          <span className="input-group-text bg-white">{item.quantity || 1}</span>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                        </div>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id)}>
                          <i className="bi bi-trash"></i> Видалити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 rounded-4 p-4 text-dark">
                <h4 className="mb-4">Підсумок</h4>
                <div className="d-flex justify-content-between mb-3">
                  <span>Кількість товарів:</span>
                  <span>{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Загальна вартість:</span>
                  <span className="fw-bold fs-4">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold">
                  Оформити замовлення
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
      autoClose={2000}
      position="top-right"
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
      />
    </>
  );
}

export default Cart;
