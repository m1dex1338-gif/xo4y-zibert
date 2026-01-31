import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
     {/* Navbar*/} 

     <div className="nav w-100 fixed-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper">

        {/* Toogle Button */}
        
         <button className="navbar-toggler"
         type="button"
         data-bs-toggle="collapse"
         data-bs-target="#navbarSupportedContent"
         aria-bs-controls="navbarNav"
         aria-expanded="false"
         aria-label="Перемкнути навігацію"
         >
         <span className="navbar-toggler-icon"></span>
         </button>

         {/* Mobile Logo */}

         <Link to='/' className='navbar-brand mx-auto order-0 d-lg-none d-flex'>
            <h2 className='m-0 fw-bold' style={{letterSpacing:'2px' }}>Все для дому</h2>
         </Link>

         {/* Mobile Icon */}

         <ul className="d-lg-none d-flex align-items-center gap-3">
          <li className="nav-item">
            <a href="#">
              <i className="bi bi-search fs-5 text-dark"></i>       
            </a>
          </li>
          <li className="nav-item">
            <a href="#" data-bs-toggle='modal' data-bs-target='#signupModal'>
              <i className="bi bi-person fs-5 text-dark"></i>       
            </a>
          </li>
          <li className="nav-item position-relative">
            <a href="#" >
              <i className="bi bi-heart fs-5 text-dark"></i>
              <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">0</span>       
            </a>
          </li>
          <li className="nav-item position-relative">
            <a href="#" >
              <i className="bi bi-bag fs-5 text-dark"></i>
              <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">0</span>       
            </a>
          </li>
         </ul>

         {/* Main Nav */}

         <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>

           {/* left Nav link */}

           <ul className="navbar-nav nav-menu align-items-center gap-4">
            <li className="nav-item">
              <Link to="/" className='nav-link'>Головна</Link>
            </li>
             <li className="nav-item">
              <Link to="/about" className='nav-link'>Про нас</Link>
            </li>
             <li className="nav-item">
              <Link to="/shop" className='nav-link'>Каталог</Link>
            </li>
             <li className="nav-item">
              <Link to="/store" className='nav-link'>Магазин</Link>
            </li>
             <li className="nav-item">
              <Link to="/blog" className='nav-link'>Блог</Link>
            </li>
             <li className="nav-item">
              <Link to="/contact" className='nav-link'>Контакти</Link>
            </li>
           </ul>

           {/* Center logo */}
           
           <a href="#" className='navbar-brand order-0 d-none d-lg-flex'>
            <h2 className='m-0 fw-bold' style={{letterSpacing:'2px' }}>Все для дому</h2>
           </a>
           
           {/* Right Icons */}

           <ul className='navbar-nav d-none d-lg-flex align-items-center gap-4'>
            <li className="nav-item">
             <a href="#">
              <i className="bi bi-search fs-5 text-dark"></i>       
             </a>
            </li>
            <li className="nav-item">
             <a href="#" data-bs-toggle='modal' data-bs-target='#signupModal'>
              <i className="bi bi-person fs-5 text-dark"></i>       
             </a>
            </li>
            <li className="nav-item position-relative">
             <a href="#" >
              <i className="bi bi-heart fs-5 text-dark"></i>
              <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">0</span>       
             </a>
            </li>
            <li className="nav-item position-relative">
             <a href="#" >
              <i className="bi bi-bag fs-5 text-dark"></i>
              <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">0</span>       
             </a>
            </li>
           </ul>

         </div>
      </nav>
     </div>

     {/* Sign-up Modal  */}

     <div className="modal fade" id='signupModal' tabIndex='-1' aria-labelledby='signupModalLabel' aria-hidden='true'>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold" id='signupModalLabel'>Реєстрація</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className='form-label'>Ім'я</label>
                <input type="text" className='form-control' placeholder='Введіть ваше імʼя' required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Електронна адреса</label>
                <input type="email" className='form-control' placeholder='Введіть електронну адресу' required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Пароль</label>
                <input type="password" className='form-control' placeholder='Введіть пароль' required />
              </div>
              <p className="text-muted">
                Реєструючись, ви погоджуєтесь з нашими <a href="#" className='text-success text-decoration-none'>Умовами</a> та <a href="#" className='text-success text-decoration-none'>Політикою конфіденційності</a>
              </p>
              <button type='button' className='btn btn-dark w-100'>Зареєструватися</button>
            </form>
            <div className="text-center mt-3">
              <p>Вже маєте акаунт? <a href="#" className='text-success fw-bold'>Увійти</a></p>
            </div>
          </div>
        </div>
      </div>  
     </div>
    </>
  );
}
export default Nav