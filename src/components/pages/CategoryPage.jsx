import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function CategoryPage() {
  const { id } = useParams()
  const [categoryName, setCategoryName] = useState('')
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filters
  const [query, setQuery] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    // default: show filters on wider screens
    try {
      setShowFilters(window.innerWidth > 768)
    } catch (e) {
      setShowFilters(true)
    }
  }, [])

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`http://127.0.0.1:8000/shop/category/${id}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setCategoryName(data.category || '')
        setProducts(data.products || [])
        setFiltered(data.products || [])
      } catch (err) {
        setError(err.message || 'Fetch error')
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [id])

  useEffect(() => {
    let list = [...products]
    // search by name or article
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(p => (p.name || '').toLowerCase().includes(q) || (p.article || '').toLowerCase().includes(q))
    }
    if (inStockOnly) list = list.filter(p => !!p.in_stock)
    if (minPrice !== '') {
      const min = parseFloat(minPrice) || 0
      list = list.filter(p => parseFloat(p.price) >= min)
    }
    if (maxPrice !== '') {
      const max = parseFloat(maxPrice) || 0
      list = list.filter(p => parseFloat(p.price) <= max)
    }
    setFiltered(list)
  }, [query, inStockOnly, minPrice, maxPrice, products])

  if (loading) return <div style={{ padding: 30 }}>Завантаження...</div>
  if (error) return <div style={{ padding: 30, color: 'red' }}>Помилка: {error}</div>

  return (
    <div className="container-fluid category-page py-4">
      <div className="category-header d-flex justify-content-between align-items-center mb-4 px-3">
        <div>
          <h2 className="fw-bold mb-0">{categoryName || 'Категорія'}</h2>
          <p className="text-muted mb-0">{products.length} товар(ів)</p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={() => setShowFilters(s => !s)} className="btn btn-outline-dark filter-toggle-btn">
            <i className="bi bi-filter me-1"></i> Фільтри
          </button>
        </div>
      </div>

      <div className="category-layout">
        {/* Left: Filters */}
        {showFilters && (
          <div className="category-sidebar shadow-sm">
            <div className="filter-group mb-3">
              <label className="fw-semibold mb-2">Пошук</label>
              <input
                className="form-control"
                placeholder="Пошук за назвою..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <div className="filter-group mb-3">
              <label className="form-check-label d-flex align-items-center gap-2">
                <input className="form-check-input" type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
                <span>В наявності</span>
              </label>
            </div>

            <div className="filter-group mb-4">
              <label className="fw-semibold mb-2">Ціна (₴)</label>
              <div className="d-flex gap-2 align-items-center">
                <input type="number" placeholder="Min" className="form-control" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <span>-</span>
                <input type="number" placeholder="Max" className="form-control" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button 
                onClick={() => { setQuery(''); setInStockOnly(false); setMinPrice(''); setMaxPrice('') }} 
                className="btn btn-dark w-100 py-2"
              >
                Скинути
              </button>
              <button onClick={() => setShowFilters(false)} className="btn btn-outline-secondary d-md-none w-100">
                Закрити
              </button>
            </div>
          </div>
        )}

        {/* Right: Products */}
        <div className="category-content">
          <div className="category-grid">
            {filtered.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="text-decoration-none">
                <div className="category-product-card shadow-sm border-0">
                  <div className="card-image-wrapper">
                    <img src={p.image} alt={p.name} className="img-fluid" />
                  </div>
                  <div className="card-body p-3">
                    <h4 className="product-title text-dark">{p.name}</h4>
                    <div className="d-flex justify-content-between align-items-end mt-2">
                      <div className="product-price fw-bold fs-5 text-dark">{p.price} ₴</div>
                      <div className={`stock-status ${p.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                        {p.in_stock ? 'В наявності' : 'Немає'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">Нічого не знайдено за вашим запитом</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
