import React, {  useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartItems, setCartItems] = React.useState([]);

  useEffect(() => {
    const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  }, []);

  const updateQuantity = (id, type) => {
      const updated = cartItems.map(item => {
        if(item.id === id) {
          if(type === 'increase') {
            return {...item, quantity: item.quantity + 1};
          }
          else if (type === 'decrease' && item.quantity > 1) {
            return {...item, quantity: item.quantity - 1};
          }  
        }
        return item;
      });
      setCartItems(updated);
      localStorage.setItem('cart', JSON.stringify(updated));      
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.error('Товар видалено з кошика!');
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <>
        <ol className="section-banner py-3 position-relative">
            <li className="position-relative"><Link to="/">Головна</Link></li>
            <li className="position-relative active"><a href="#" className="ps-5">Кошик</a></li>
        </ol>

        <div className="container my-5">
            <div className="text-center mb-4 fw-bold">Кошик</div>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="lead">Кошик порожній!</p>
                    <Link to="/shop" className="btn mt-3">Повернутися до покупок</Link>
                </div>  
            ): (
                <div className="row g-4">
                    <div className="col-lg-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="card shadow-sm border-0 rounded-4 mb-3 p-3">
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <img src={item.image} alt="" className="img-fluid rounded-3" />
                                    </div>
                                    <div className="col-9 d-flex flex-column flex-md-row justify-content-between align-items-center">
                                        <div className="text-start w-100">
                                            <h5 className="mb-2">{item.Productname}</h5>
                                            <p className="text-muted mb-1">Price{item.price}</p> 
                                            <p className="text-muted mb-1">Total ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p> 
                                        </div>
                                        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                                            <button className="bnt btn-sm" onClick={()=> updateQuantity(item.id, 'decrease')}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="bnt btn-sm" onClick={()=> updateQuantity(item.id, 'increase')}>+</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Видалити</button>
                                          
                                        </div>
                                    </div>             
                                </div>    
                            </div>    
                        ))}         
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Cart