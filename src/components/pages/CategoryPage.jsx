import React, { useEffect, useState, useMemo, useCallback } from 'react'
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
  const [selectedFilters, setSelectedFilters] = useState({}) // { "Бренд": { "ATM": true } }

  useEffect(() => {
    try {
      setShowFilters(window.innerWidth > 768)
    } catch {
      setShowFilters(true)
    }
  }, [])

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/shop/category/${id}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setCategoryName(data.category || '')
        setProducts(data.products || [])
        setFiltered(data.products || [])
        setSelectedFilters({}) // скидуємо при переході на іншу категорію
      } catch (err) {
        setError(err.message || 'Fetch error')
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [id])

  // Динамічний розрахунок доступних характеристик для фільтрації
  const filterableAttributes = useMemo(() => {
    const counts = {}
    products.forEach(p => {
      if (p.brand) counts['Бренд'] = (counts['Бренд'] || 0) + 1
      if (p.color) counts['Колір'] = (counts['Колір'] || 0) + 1
      if (p.material) counts['Матеріал'] = (counts['Матеріал'] || 0) + 1

      if (p.characteristics) {
        Object.keys(p.characteristics).forEach(k => {
          if (k !== 'Категорія' && k !== 'Бренд' && k !== 'Колір' && k !== 'Матеріал') {
            counts[k] = (counts[k] || 0) + 1
          }
        })
      }
    })
    // Повертаємо атрибути, що є хоча б у одного товару
    return Object.keys(counts).filter(k => counts[k] > 0)
  }, [products])

  // Отримання унікальних значень для конкретної характеристики
  const getUniqueValuesForAttr = useCallback((attrName) => {
    const vals = new Set()
    products.forEach(p => {
      let val = null
      if (attrName === 'Бренд') {
        val = p.brand || (p.characteristics && p.characteristics['Бренд'])
      } else if (attrName === 'Колір') {
        val = p.color || (p.characteristics && p.characteristics['Колір'])
      } else if (attrName === 'Матеріал') {
        val = p.material || (p.characteristics && p.characteristics['Матеріал'])
      } else {
        val = p.characteristics && p.characteristics[attrName]
      }

      if (val) {
        const valStr = String(val).trim()
        if (valStr) {
          vals.add(valStr)
        }
      }
    })
    return Array.from(vals).sort((a, b) => a.localeCompare(b, 'uk'))
  }, [products])

  const handleFilterChange = (attrName, valName, isChecked) => {
    setSelectedFilters(prev => {
      const nextAttr = { ...prev[attrName], [valName]: isChecked }
      // видаляємо значення false, щоб не засмічувати стейт
      Object.keys(nextAttr).forEach(k => {
        if (!nextAttr[k]) delete nextAttr[k]
      })

      const nextFilters = { ...prev, [attrName]: nextAttr }
      if (Object.keys(nextAttr).length === 0) {
        delete nextFilters[attrName]
      }
      return nextFilters
    })
  }

  const handleReset = () => {
    setQuery('')
    setInStockOnly(false)
    setMinPrice('')
    setMaxPrice('')
    setSelectedFilters({})
  }

  useEffect(() => {
    let list = [...products]

    // 1. Пошук
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(p => (p.name || '').toLowerCase().includes(q) || (p.article || '').toLowerCase().includes(q))
    }

    // 2. Наявність
    if (inStockOnly) {
      list = list.filter(p => !!p.in_stock)
    }

    // 3. Діапазон цін
    if (minPrice !== '') {
      const min = parseFloat(minPrice) || 0
      list = list.filter(p => parseFloat(p.price) >= min)
    }
    if (maxPrice !== '') {
      const max = parseFloat(maxPrice) || 0
      list = list.filter(p => parseFloat(p.price) <= max)
    }

    // 4. Динамічні фільтри
    Object.entries(selectedFilters).forEach(([attrName, valMap]) => {
      const activeVals = Object.keys(valMap)
      if (activeVals.length > 0) {
        list = list.filter(p => {
          let val = null
          if (attrName === 'Бренд') {
            val = p.brand || (p.characteristics && p.characteristics['Бренд'])
          } else if (attrName === 'Колір') {
            val = p.color || (p.characteristics && p.characteristics['Колір'])
          } else if (attrName === 'Матеріал') {
            val = p.material || (p.characteristics && p.characteristics['Матеріал'])
          } else {
            val = p.characteristics && p.characteristics[attrName]
          }

          if (!val) return false
          return activeVals.includes(String(val).trim())
        })
      }
    })

    setFiltered(list)
  }, [query, inStockOnly, minPrice, maxPrice, selectedFilters, products])

  if (loading) {
    return (
      <div className="gns-loader-container" style={{ margin: '100px auto' }}>
        <div className="gns-loader">
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-ring"></div>
          <div className="gns-loader-pulse"></div>
        </div>
        <div className="gns-loader-text">Завантаження товарів...</div>
      </div>
    );
  }
  if (error) return <div className="container py-5 text-center text-danger">Помилка завантаження: {error}</div>

  return (
    <div className="container-fluid category-page py-4">
      <div className="category-header d-flex justify-content-between align-items-center mb-4 px-3 mt-2">
        <div>
          <h2 className="fw-bold mb-0">{categoryName || 'Категорія'}</h2>
          <p className="text-muted mb-0">Знайдено {filtered.length} з {products.length} товар(ів)</p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={() => setShowFilters(s => !s)} className="btn btn-outline-dark filter-toggle-btn">
            <i className="bi bi-filter me-1"></i> {showFilters ? 'Приховати фільтри' : 'Показати фільтри'}
          </button>
        </div>
      </div>

      <div className="category-layout">
        {/* Left: Filters */}
        {showFilters && (
          <div className="category-sidebar shadow-sm">
            <div className="filter-group mb-3">
              <label className="fw-bold mb-2 text-dark fs-6">Пошук у категорії</label>
              <input
                className="form-control"
                placeholder="Назва або артикул..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <div className="filter-group mb-3">
              <label className="form-check-label d-flex align-items-center gap-2 cursor-pointer">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={e => setInStockOnly(e.target.checked)} 
                />
                <span className="fw-semibold text-dark">Тільки в наявності</span>
              </label>
            </div>

            <div className="filter-group mb-4">
              <label className="fw-bold mb-2 text-dark fs-6">Ціна (₴)</label>
              <div className="d-flex gap-2 align-items-center">
                <input type="number" placeholder="Від" className="form-control" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <span>-</span>
                <input type="number" placeholder="До" className="form-control" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </div>

            {/* Dynamic Attributes Filters */}
            {filterableAttributes.map(attr => {
              const values = getUniqueValuesForAttr(attr)
              if (values.length <= 1) return null

              return (
                <div className="filter-group mb-4 border-top pt-3" key={attr}>
                  <label className="fw-bold mb-2 text-dark fs-6">{attr}</label>
                  <div className="filter-values-container custom-scroll" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
                    {values.map(val => {
                      const isChecked = !!(selectedFilters[attr] && selectedFilters[attr][val])
                      return (
                        <div key={val} className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input border-secondary"
                            id={`filter-${attr}-${val}`}
                            checked={isChecked}
                            onChange={e => handleFilterChange(attr, val, e.target.checked)}
                          />
                          <label className="form-check-label text-muted small cursor-pointer" htmlFor={`filter-${attr}-${val}`}>
                            {val}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div className="d-flex gap-2 border-top pt-3">
              <button onClick={handleReset} className="btn btn-dark w-100 py-2 rounded-pill fw-semibold">
                Скинути все
              </button>
            </div>
          </div>
        )}

        {/* Right: Products */}
        <div className="category-content">
          <div className="category-grid">
            {filtered.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="text-decoration-none">
                <div className="category-product-card shadow-sm border-0 position-relative">
                  <div className="card-image-wrapper">
                    <img src={p.image} alt={p.name} className="img-fluid" />
                  </div>
                  <div className="card-body p-3">
                    <h4 className="product-title text-dark fw-semibold text-truncate-2 mb-2" style={{ height: '42px', fontSize: '0.95rem', overflow: 'hidden' }}>
                      {p.name}
                    </h4>
                    <div className="d-flex justify-content-between align-items-end mt-3">
                      <div className="product-price fw-bold fs-5 text-dark">{p.price} ₴</div>
                      <div className={`stock-status ${p.in_stock ? 'in-stock' : 'out-of-stock'} fw-semibold`}>
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
              <i className="bi bi-info-circle text-muted fs-1"></i>
              <p className="text-muted mt-3">Нічого не знайдено за обраними параметрами фільтру.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

