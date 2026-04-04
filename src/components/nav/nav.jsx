import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

function Nav() {
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularCategories, setPopularCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const debounceTimer = useRef(null);

  // Завантаження популярних категорій для порожнього стану
  useEffect(() => {
    fetch('http://127.0.0.1:8000/shop/categories/')
      .then(r => r.json())
      .then(data => {
        if (data.categories) {
          setPopularCategories(data.categories.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  // Завантаження кешу для fuzzy fallback
  useEffect(() => {
    const cached = localStorage.getItem('searchProductsCache');
    const cacheTime = localStorage.getItem('searchProductsCacheTime');
    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 24 * 60 * 60 * 1000) {
      setAllProducts(JSON.parse(cached));
    } else {
      fetch('http://127.0.0.1:8000/shop/products/')
        .then(r => r.json())
        .then(data => {
          if (data.products) {
            setAllProducts(data.products);
            localStorage.setItem('searchProductsCache', JSON.stringify(data.products));
            localStorage.setItem('searchProductsCacheTime', Date.now().toString());
          }
        })
        .catch(() => {});
    }
  }, []);

  // Debounce — запускаємо пошук через 300мс після зупинки введення
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [searchQuery]);

  // Бекенд-пошук + fuzzy fallback
  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    fetch(`http://127.0.0.1:8000/shop/search/?q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setSearchResults(data.results);
        } else if (allProducts.length > 0) {
          // Fuzzy fallback через fuse.js (для друкарських помилок)
          const fuse = new Fuse(allProducts, {
            keys: ['name'],
            threshold: 0.4,
            includeMatches: true,
          });
          const fuzzyResults = fuse.search(q).slice(0, 10).map(r => r.item);
          setSearchResults(fuzzyResults);
        } else {
          setSearchResults([]);
        }
      })
      .catch(() => {
        // Якщо бекенд недоступний — тільки fuzzy
        if (allProducts.length > 0) {
          const fuse = new Fuse(allProducts, { keys: ['name'], threshold: 0.4 });
          setSearchResults(fuse.search(q).slice(0, 10).map(r => r.item));
        }
      })
      .finally(() => setIsSearching(false));
  }, [debouncedQuery, allProducts]);

  // Функція підсвічування збігів
  const highlight = (text, query) => {
    if (!query.trim() || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} style={{backgroundColor:'#fff3cd', padding:'0 2px', borderRadius:'2px'}}>{part}</mark> : part
    );
  };

  
  const updateCounts = () => {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();

    const handleCartUpdate =() => updateCounts();
    const handleWishlistUpdate =() => updateCounts();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    const onStorageChange = (e) => {
      if (e.key === 'cart' || e.key === 'wishlist') {
        updateCounts();
      }
    };
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
     {/* Navbar*/} 

     <div className="nav w-100 fixed-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper">

        {/* Toogle Button */}
        
         <button 
           className={`navbar-toggler border-0 shadow-none ${isOpen ? 'active' : ''}`}
           type="button"
           onClick={toggleMenu}
           aria-label="Toggle navigation"
         >
           <div className="hamburger-icon">
             <span></span>
             <span></span>
             <span></span>
           </div>
         </button>

         {/* Mobile Logo */}

         <Link to='/' className='navbar-brand mx-auto order-0 d-lg-none d-flex' onClick={closeMenu}>
            <h2 className='m-0 fw-bold' style={{letterSpacing:'2px' }}>Все для дому</h2>
         </Link>

         {/* Mobile Icon */}

         <ul className="d-lg-none d-flex align-items-center gap-3 m-0 p-0">
          <li className="nav-item">
            <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={closeMenu}>
              <i className="bi bi-search fs-5 text-dark"></i>       
            </a>
          </li>
          <li className="nav-item position-relative">
            <Link to="/cart" onClick={closeMenu}>
              <i className="bi bi-bag fs-5 text-dark"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill bg-danger text-white px-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
         </ul>

         {/* Main Nav */}

         <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show custom-mobile-menu' : ''}`} id='navbarNav'>
           
           {/* Mobile Menu Header (Visible only when open on mobile) */}
           <div className="d-lg-none w-100 d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
             <h4 className="fw-bold m-0">Меню</h4>
             <button className="btn-close" onClick={closeMenu}></button>
           </div>

           {/* left Nav link */}

           <ul className="navbar-nav nav-menu align-items-center gap-4">
            <li className="nav-item">
              <Link to="/" className='nav-link' onClick={closeMenu}>Головна</Link>
            </li>
             <li className="nav-item">
              <Link to="/about" className='nav-link' onClick={closeMenu}>Про нас</Link>
            </li>
             <li className="nav-item">
              <Link to="/categories" className='nav-link' onClick={closeMenu}>Каталог</Link>
            </li>
             <li className="nav-item">
              <Link to="/blog" className='nav-link' onClick={closeMenu}>Блог</Link>
            </li>
             <li className="nav-item">
              <Link to="/contact" className='nav-link' onClick={closeMenu}>Контакти</Link>
            </li>
           </ul>

           {/* Center logo */}
           
            <Link to='/' className='navbar-brand mx-auto d-none d-lg-flex'>
                <h2 className='m-0 fw-bold' style={{letterSpacing:'2px' }}>Все для дому</h2>
            </Link>
           
           {/* Right Icons */}

           <ul className='navbar-nav d-none d-lg-flex align-items-center gap-4'>
            <li className="nav-item">
             <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
              <i className="bi bi-search fs-5 text-dark"></i>       
             </a>
            </li>
            <li className="nav-item">
             <a href="#" data-bs-toggle='modal' data-bs-target='#signupModal'>
              <i className="bi bi-person fs-5 text-dark"></i>       
             </a>
            </li>
            <li className="nav-item position-relative">
              <Link to='/wishlist'>
              <i className="bi bi-heart fs-5 text-dark"></i>
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill bg-danger text-white px-2">
                  {wishlistCount}
                </span>
              )}
             </Link>
            </li>
            <li className="nav-item position-relative">
              <Link to='/cart'>
              <i className="bi bi-bag fs-5 text-dark"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill bg-danger text-white px-2">
                  {cartCount}
                </span>
              )}
             </Link>
            </li>
           </ul>

         </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
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

     <div className="modal fade" id='searchModal' tabIndex='-1' aria-labelledby='searchModalLabel' aria-hidden='true'>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id='searchModalLabel'>Пошук товарів</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pt-3">
            {/* Search input */}
            <div className="position-relative mb-4">
              <i className="bi bi-search position-absolute text-muted" style={{top:'50%', left:'14px', transform:'translateY(-50%)', zIndex:1}}></i>
              <input 
                type="text" 
                className='form-control form-control-lg ps-5'
                placeholder='Що ви шукаєте? (Наприклад: Стілець)'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                autoFocus
              />
              {searchQuery && (
                <button
                  className="btn btn-sm position-absolute border-0 bg-transparent text-muted"
                  style={{top:'50%', right:'12px', transform:'translateY(-50%)'}}
                  onClick={() => setSearchQuery('')}
                  aria-label="Очистити"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>

            {/* Спінер під час пошуку */}
            {isSearching && (
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-secondary" role="status">
                  <span className="visually-hidden">Пошук...</span>
                </div>
                <p className="text-muted mt-2 mb-0 small">Шукаємо...</p>
              </div>
            )}

            {/* Нічого не знайдено */}
            {!isSearching && debouncedQuery.trim() !== '' && searchResults.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search text-muted" style={{fontSize:'2rem'}}></i>
                <p className="text-muted mt-2">Нічого не знайдено за запитом <strong>"{debouncedQuery}"</strong></p>
                <p className="text-muted small">Спробуйте інше слово або перевірте правопис</p>
              </div>
            )}

            {/* Результати пошуку */}
            {!isSearching && searchResults.length > 0 && (
              <>
                <p className="text-muted small mb-2">Знайдено {searchResults.length} результатів</p>
                <div className="row g-3" style={{maxHeight: '400px', overflowY: 'auto'}}>
                  {searchResults.map(product => (
                    <div className="col-12 col-md-6" key={product.id}>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="text-decoration-none" 
                        onClick={() => {
                          const closeBtn = document.querySelector('#searchModal .btn-close');
                          if (closeBtn) closeBtn.click();
                        }}
                      >
                        <div className="d-flex align-items-center p-2 border rounded" style={{transition:'background 0.15s'}}
                          onMouseEnter={e => e.currentTarget.style.background='#f8f9fa'}
                          onMouseLeave={e => e.currentTarget.style.background=''}
                        >
                          <img 
                            src={product.images ? product.images[0] : product.image} 
                            alt={product.name} 
                            style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink:0}} 
                          />
                          <div className="ms-3 overflow-hidden">
                            <h6 className="mb-1 fw-semibold text-dark text-truncate">
                              {highlight(product.name, debouncedQuery)}
                            </h6>
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-bold text-dark">{product.price} ₴</span>
                              {product.category && (
                                <span className="badge bg-light text-muted border small">{product.category}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Популярні категорії (коли запит порожній) */}
            {!isSearching && searchQuery.trim() === '' && popularCategories.length > 0 && (
              <div>
                <p className="text-muted small fw-semibold mb-3">
                  <i className="bi bi-fire me-1 text-warning"></i>Популярні категорії
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {popularCategories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="badge text-dark text-decoration-none py-2 px-3"
                      style={{background:'#f1f3f5', fontSize:'0.85rem', borderRadius:'20px', border:'1px solid #dee2e6', transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='#e9ecef'}
                      onMouseLeave={e => e.currentTarget.style.background='#f1f3f5'}
                      onClick={() => {
                        const closeBtn = document.querySelector('#searchModal .btn-close');
                        if (closeBtn) closeBtn.click();
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>  
     </div>

    </>
  );
}
export default Nav