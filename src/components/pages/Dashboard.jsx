import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [auth, setAuth] = useState({ checked: false, authenticated: false, username: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Dashboard States
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: success/error
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Modals States
  const [showModal, setShowModal] = useState(false); // add/edit modal
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    article: '',
    name: '',
    category_id: '',
    price: 0,
    in_stock: true,
    brand: '',
    color: '',
    material: '',
    main_image_url: '',
    description_text: '',
    description_html: '',
    characteristics: {}
  });
  const [charList, setCharList] = useState([]); // Array of { key: '', value: '' } for editing characteristics
  const [uploadFile, setUploadFile] = useState(null);

  // Check Auth
  const checkAuthStatus = () => {
    fetch('/shop/api/auth-check/')
      .then(r => r.json())
      .then(data => {
        setAuth({ checked: true, authenticated: data.authenticated, username: data.username });
      })
      .catch(() => {
        setAuth({ checked: true, authenticated: false, username: '' });
      });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Fetch categories when authenticated
  useEffect(() => {
    if (auth.authenticated) {
      fetch('/shop/categories/')
        .then(r => r.json())
        .then(data => {
          if (data.categories) {
            setCategories(data.categories);
            if (data.categories.length > 0) {
              setSelectedCategoryId(data.categories[0].id);
            }
          }
        })
        .catch(() => showMsg('Помилка завантаження категорій', 'error'));
    }
  }, [auth.authenticated]);

  // Fetch products when category changes
  useEffect(() => {
    if (auth.authenticated && selectedCategoryId && !searchQuery) {
      setIsLoading(true);
      fetch(`/shop/category/${selectedCategoryId}/`)
        .then(r => r.json())
        .then(data => {
          setProducts(data.products || []);
          setCurrentPage(1);
        })
        .catch(() => showMsg('Помилка завантаження товарів категорії', 'error'))
        .finally(() => setIsLoading(false));
    }
  }, [auth.authenticated, selectedCategoryId, searchQuery]);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    fetch('/shop/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setAuth({ checked: true, authenticated: true, username: data.username });
        } else {
          setLoginError(data.error || 'Помилка авторизації');
        }
      })
      .catch(() => setLoginError('Помилка сервера. Спробуйте пізніше.'));
  };

  // Logout handler
  const handleLogout = () => {
    fetch('/shop/api/logout/', { method: 'POST' })
      .then(() => {
        setAuth({ checked: true, authenticated: false, username: '' });
        setProducts([]);
      });
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    fetch(`/shop/search/?q=${encodeURIComponent(searchQuery)}`)
      .then(r => r.json())
      .then(data => {
        setProducts(data.results || []);
        setCurrentPage(1);
      })
      .catch(() => showMsg('Помилка пошуку товарів', 'error'))
      .finally(() => setIsLoading(false));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Characteristics Key-Value helpers
  const handleAddChar = () => {
    setCharList([...charList, { key: '', value: '' }]);
  };

  const handleRemoveChar = (index) => {
    const newList = [...charList];
    newList.splice(index, 1);
    setCharList(newList);
  };

  const handleCharChange = (index, field, val) => {
    const newList = [...charList];
    newList[index][field] = val;
    setCharList(newList);
  };

  // Open add/edit modal
  const openModal = (type, product = null) => {
    setModalType(type);
    setUploadFile(null);
    if (type === 'edit' && product) {
      // Fetch details of product to populate full characteristics and description
      setIsLoading(true);
      fetch(`/shop/product/${product.id}/`)
        .then(r => r.json())
        .then(data => {
          setCurrentProduct({
            id: data.id,
            article: data.article || '',
            name: data.name || '',
            category_id: data.category_id || selectedCategoryId,
            price: data.price ? parseFloat((data.price / 40.0).toFixed(2)) : 0, // Convert UAH back to USD for editing (assume course 40)
            in_stock: data.in_stock,
            brand: data.brand || '',
            color: data.color || '',
            material: data.material || '',
            main_image_url: data.images && data.images.length > 0 ? data.images[0] : (data.main_image_url || ''),
            description_text: data.description_text || '',
            description_html: data.description_html || '',
            characteristics: data.characteristics || {}
          });
          
          // Map characteristics dict to list
          const list = [];
          if (data.characteristics) {
            Object.entries(data.characteristics).forEach(([k, v]) => {
              if (Array.isArray(v)) {
                v.forEach(val => list.push({ key: k, value: val }));
              } else {
                list.push({ key: k, value: v });
              }
            });
          }
          setCharList(list);
          setShowModal(true);
        })
        .catch(() => showMsg('Помилка завантаження деталей товару', 'error'))
        .finally(() => setIsLoading(false));
    } else {
      setCurrentProduct({
        id: null,
        article: '',
        name: '',
        category_id: selectedCategoryId || (categories.length > 0 ? categories[0].id : ''),
        price: 0,
        in_stock: true,
        brand: '',
        color: '',
        material: '',
        main_image_url: '',
        description_text: '',
        description_html: '',
        characteristics: {}
      });
      setCharList([
        { key: 'Бренд', value: '' },
        { key: 'Колір', value: '' },
        { key: 'Матеріал', value: '' }
      ]);
      setShowModal(true);
    }
  };

  // Submit product creation/update
  const handleProductSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Build characteristics dict
    const chars = {};
    charList.forEach(item => {
      const k = item.key.strip ? item.key.strip() : item.key.trim();
      const v = item.value.strip ? item.value.strip() : item.value.trim();
      if (k && v) {
        if (k in chars) {
          if (Array.isArray(chars[k])) {
            chars[k].push(v);
          } else {
            chars[k] = [chars[k], v];
          }
        } else {
          chars[k] = v;
        }
      }
    });

    const formData = new FormData();
    formData.append('article', currentProduct.article);
    formData.append('name', currentProduct.name);
    formData.append('category_id', currentProduct.category_id);
    formData.append('price', currentProduct.price);
    formData.append('in_stock', currentProduct.in_stock);
    formData.append('brand', currentProduct.brand || chars['Бренд'] || '');
    formData.append('color', currentProduct.color || chars['Колір'] || '');
    formData.append('material', currentProduct.material || chars['Матеріал'] || '');
    formData.append('main_image_url', currentProduct.main_image_url);
    formData.append('description_text', currentProduct.description_text);
    formData.append('description_html', currentProduct.description_html);
    formData.append('characteristics', JSON.stringify(chars));
    if (uploadFile) {
      formData.append('image_file', uploadFile);
    }

    const endpoint = modalType === 'add' 
      ? '/shop/api/products/create/' 
      : `/shop/api/products/update/${currentProduct.id}/`;

    fetch(endpoint, {
      method: 'POST',
      body: formData
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          showMsg(modalType === 'add' ? 'Товар успішно створено!' : 'Товар успішно оновлено!');
          setShowModal(false);
          // Refresh products
          if (searchQuery) {
            // trigger search refresh
            document.getElementById('searchFormBtn').click();
          } else {
            // trigger category refresh by toggling state
            setSelectedCategoryId(String(selectedCategoryId));
          }
        } else {
          alert(data.error || 'Помилка збереження товару');
        }
      })
      .catch(() => alert('Помилка сервера при збереженні'))
      .finally(() => setIsLoading(false));
  };

  // Delete product handler
  const handleDeleteProduct = (product) => {
    if (window.confirm(`Ви впевнені, що хочете видалити товар "${product.name}" (Арт: ${product.article})?`)) {
      setIsLoading(true);
      fetch(`/shop/api/products/delete/${product.id}/`, { method: 'POST' })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            showMsg('Товар успішно видалено');
            setProducts(products.filter(p => p.id !== product.id));
          } else {
            alert(data.error || 'Не вдалося видалити товар');
          }
        })
        .catch(() => alert('Помилка звʼязку з сервером'))
        .finally(() => setIsLoading(false));
    }
  };

  // Pagination helper
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (!auth.checked) {
    return (
      <div className="admin-loading-container d-flex flex-column align-items-center justify-content-center">
        <div className="gns-loader mb-3">
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-core"></div>
        </div>
        <p className="text-muted fw-semibold">Перевірка сесії адміна...</p>
      </div>
    );
  }

  // Render LOGIN SCREEN if not authenticated
  if (!auth.authenticated) {
    return (
      <div className="admin-login-layout d-flex align-items-center justify-content-center">
        <div className="login-card p-5 border rounded shadow-lg bg-white">
          <div className="text-center mb-4">
            <img src="/logo.png" alt="GNS Logo" className="login-logo mb-2" style={{width:'50px'}} />
            <h3 className="fw-bold">GNS Backoffice</h3>
            <p className="text-muted small">Увійдіть за допомогою облікового запису адміністратора</p>
          </div>
          {loginError && <div className="alert alert-danger py-2">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Логін (Username)</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Введіть логін..." 
                value={loginData.username}
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Пароль</label>
              <input 
                type="password" 
                className="form-control"
                placeholder="Введіть пароль..." 
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold">Увійти в панель</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/" className="text-muted small text-decoration-none">← Повернутись на сайт</Link>
          </div>
        </div>
      </div>
    );
  }

  // Render ADMIN DASHBOARD UI
  return (
    <div className="admin-dashboard-container py-5 mt-5">
      <div className="container">
        
        {/* Header Block */}
        <header className="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-4 border-bottom g-3">
          <div className="d-flex align-items-center gap-2">
            <img src="/logo.png" alt="Logo" style={{width:'40px'}} />
            <div>
              <h2 className="m-0 fw-bold">Панель управління GNS</h2>
              <span className="badge bg-success small">Адміністратор: {auth.username}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary fw-semibold d-flex align-items-center gap-2" onClick={() => openModal('add')}>
              <i className="bi bi-plus-circle"></i> Додати товар
            </button>
            <button className="btn btn-outline-danger fw-semibold" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Вийти
            </button>
          </div>
        </header>

        {/* Global Alerts */}
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} show shadow-sm py-2`} role="alert">
            {message.text}
          </div>
        )}

        {/* Filters and Search toolbar */}
        <div className="row g-3 mb-4 align-items-end">
          {/* Category Dropdown */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold text-muted small">Категорія товарів</label>
            <select 
              className="form-select py-2" 
              value={selectedCategoryId} 
              onChange={e => {
                setSelectedCategoryId(e.target.value);
                setSearchQuery(''); // clear search when switching category
              }}
              disabled={!!searchQuery}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="col-12 col-md-5">
            <label className="form-label fw-semibold text-muted small">Пошук по всій базі даних</label>
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <div className="position-relative flex-grow-1">
                <input 
                  type="text" 
                  className="form-control py-2 ps-4" 
                  placeholder="Введіть артикул чи назву..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="btn btn-sm position-absolute border-0 bg-transparent text-muted"
                    style={{right: '8px', top: '50%', transform: 'translateY(-50%)'}}
                    onClick={handleClearSearch}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
              <button type="submit" id="searchFormBtn" className="btn btn-dark px-3"><i className="bi bi-search"></i></button>
            </form>
          </div>

          {/* Helper info */}
          <div className="col-12 col-md-3 text-md-end">
            <span className="text-muted small">Знайдено товарів: <strong>{products.length}</strong></span>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border spinner-border-sm text-secondary" role="status">
              <span className="visually-hidden">Завантаження...</span>
            </div>
            <p className="text-muted mt-2 small">Завантаження даних...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5 border rounded bg-white">
            <i className="bi bi-inbox text-muted fs-1"></i>
            <p className="text-muted mt-2">Товарів не знайдено</p>
          </div>
        ) : (
          /* Products Table */
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{width: '70px'}}>Фото</th>
                    <th style={{width: '120px'}}>Артикул</th>
                    <th>Назва товару</th>
                    <th style={{width: '100px'}}>Ціна ($)</th>
                    <th style={{width: '120px'}}>Наявність</th>
                    <th style={{width: '180px'}} className="text-end">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(p => (
                    <tr key={p.id}>
                      <td>
                        <img 
                          src={p.image || '/logo.png'} 
                          alt="" 
                          className="rounded border" 
                          style={{width:'50px', height:'50px', objectFit:'cover'}} 
                          onError={e => { e.target.src = '/logo.png'; }}
                        />
                      </td>
                      <td><code className="text-dark fw-bold">{p.article}</code></td>
                      <td>
                        <div className="fw-semibold text-truncate" style={{maxWidth: '300px'}} title={p.name}>{p.name}</div>
                        <span className="badge bg-light text-muted border small">{p.brand || 'Без бренду'}</span>
                      </td>
                      <td><span className="fw-bold text-success">${p.price || 0}</span></td>
                      <td>
                        {p.in_stock ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle">В наявності</span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle">Немає</span>
                        )}
                      </td>
                      <td className="text-end">
                        <div className="btn-group gap-1">
                          <Link 
                            to={`/product/${p.id}`} 
                            target="_blank" 
                            className="btn btn-sm btn-outline-secondary" 
                            title="Подивитись демо на сайті"
                          >
                            <i className="bi bi-eye"></i> Демо
                          </Link>
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => openModal('edit', p)}
                            title="Редагувати товар"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDeleteProduct(p)}
                            title="Видалити"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            {totalPages > 1 && (
              <div className="card-footer bg-white d-flex align-items-center justify-content-between py-3 border-top">
                <span className="small text-muted">Сторінка {currentPage} з {totalPages}</span>
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm m-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Попередня</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Наступна</button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        )}

        {/* MODAL WINDOW FOR ADD / EDIT */}
        {showModal && (
          <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
            <div className="modal-content-custom bg-white border rounded shadow-lg p-4 m-3" style={{maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto'}}>
              
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                <h4 className="m-0 fw-bold">
                  {modalType === 'add' ? 'Додати новий товар' : `Редагувати товар ID: ${currentProduct.id}`}
                </h4>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleProductSubmit}>
                <div className="row g-3">
                  
                  {/* Article & Name */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Артикул / Код товара *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentProduct.article} 
                      onChange={e => setCurrentProduct({ ...currentProduct, article: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label fw-semibold small">Назва товару *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentProduct.name} 
                      onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      required 
                    />
                  </div>

                  {/* Category, Price, Stock */}
                  <div className="col-md-5">
                    <label className="form-label fw-semibold small">Категорія *</label>
                    <select 
                      className="form-select"
                      value={currentProduct.category_id}
                      onChange={e => setCurrentProduct({ ...currentProduct, category_id: e.target.value })}
                      required
                    >
                      <option value="" disabled>Оберіть категорію...</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold small">Ціна (USD / $)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-control"
                      value={currentProduct.price} 
                      onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-end pb-2">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="inStockSwitch" 
                        checked={currentProduct.in_stock}
                        onChange={e => setCurrentProduct({ ...currentProduct, in_stock: e.target.checked })}
                      />
                      <label className="form-check-label fw-semibold small" htmlFor="inStockSwitch">В наявності на складі</label>
                    </div>
                  </div>

                  {/* Brand, Color, Material */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Бренд</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentProduct.brand} 
                      onChange={e => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Колір</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentProduct.color} 
                      onChange={e => setCurrentProduct({ ...currentProduct, color: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">Матеріал</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentProduct.material} 
                      onChange={e => setCurrentProduct({ ...currentProduct, material: e.target.value })}
                    />
                  </div>

                  {/* Main Image URL & Upload */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold small">Посилання на головне фото (URL)</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="https://..."
                      value={currentProduct.main_image_url} 
                      onChange={e => setCurrentProduct({ ...currentProduct, main_image_url: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold small">Або завантажити файл з комп'ютера</label>
                    <input 
                      type="file" 
                      className="form-control"
                      accept="image/*"
                      onChange={e => setUploadFile(e.target.files[0])}
                    />
                  </div>

                  {/* Image Preview */}
                  {(currentProduct.main_image_url || uploadFile) && (
                    <div className="col-12 text-center p-2 border rounded bg-light">
                      <span className="small text-muted block mb-1">Попередній перегляд фото:</span>
                      <img 
                        src={uploadFile ? URL.createObjectURL(uploadFile) : currentProduct.main_image_url} 
                        alt="Preview" 
                        style={{maxHeight: '150px', maxWidth: '100%', objectFit: 'contain'}} 
                      />
                    </div>
                  )}

                  {/* Text Description */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Опис (Текст)</label>
                    <textarea 
                      className="form-control" 
                      rows="4" 
                      value={currentProduct.description_text}
                      onChange={e => setCurrentProduct({ ...currentProduct, description_text: e.target.value })}
                    ></textarea>
                  </div>

                  {/* HTML Description */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Опис (HTML-форматування)</label>
                    <textarea 
                      className="form-control font-monospace" 
                      rows="4"
                      placeholder="<p>Текст опис...</p>"
                      value={currentProduct.description_html}
                      onChange={e => setCurrentProduct({ ...currentProduct, description_html: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Key-Value Characteristics list */}
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="form-label fw-semibold small m-0">Додаткові характеристики товарів</label>
                      <button type="button" className="btn btn-sm btn-outline-dark" onClick={handleAddChar}>+ Додати характеристику</button>
                    </div>
                    {charList.length === 0 ? (
                      <span className="text-muted small block text-center py-2 border rounded bg-light">Немає характеристик</span>
                    ) : (
                      <div className="row g-2">
                        {charList.map((item, idx) => (
                          <div className="col-12 d-flex gap-2 align-items-center" key={idx}>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              placeholder="Назва (напр: Розмір)" 
                              value={item.key}
                              onChange={e => handleCharChange(idx, 'key', e.target.value)}
                              required
                            />
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              placeholder="Значення (напр: 50мм)" 
                              value={item.value}
                              onChange={e => handleCharChange(idx, 'value', e.target.value)}
                              required
                            />
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveChar(idx)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  {modalType === 'edit' && currentProduct.id && (
                    <Link 
                      to={`/product/${currentProduct.id}`} 
                      target="_blank" 
                      className="btn btn-outline-success fw-semibold"
                    >
                      <i className="bi bi-eye"></i> Переглянути демо товар на сайті
                    </Link>
                  )}
                  <div className="d-flex gap-2 ms-auto">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Скасувати</button>
                    <button type="submit" className="btn btn-dark px-4 fw-semibold" disabled={isLoading}>
                      {isLoading ? 'Збереження...' : (modalType === 'add' ? 'Створити товар' : 'Зберегти зміни')}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
