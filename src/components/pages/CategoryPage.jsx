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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0 }}>{categoryName || 'Категорія'}</h2>
          <p style={{ margin: 0, color: '#666' }}>{products.length} товар(ів)</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setShowFilters(s => !s)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', background: '#fff' }}>Фільтри</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Left: Filters */}
        {showFilters && (
          <div style={{ width: 260, border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fff', height: 'fit-content' }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Пошук</label>
              <input
                placeholder="Пошук за назвою або артикулом"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ padding: '8px 12px', width: '100%', borderRadius: 6, border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
                <span>В наявності</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 6 }}>Ціна від</label>
                <input type="number" placeholder="min" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ddd' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 6 }}>до</label>
                <input type="number" placeholder="max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ddd' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setQuery(''); setInStockOnly(false); setMinPrice(''); setMaxPrice('') }} style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none', background: '#222', color: '#fff' }}>Скинути</button>
              <button onClick={() => setShowFilters(false)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', background: '#fff' }}>Готово</button>
            </div>
          </div>
        )}

        {/* Right: Products */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
            {filtered.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                  <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                    <img src={p.image} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: 12 }}>
                    <h4 style={{ fontSize: 15, margin: '0 0 8px 0' }}>{p.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700 }}>{p.price} ₴</div>
                      <div style={{ color: p.in_stock ? '#2a8f4f' : '#b54545', fontSize: 13 }}>{p.in_stock ? 'В наявності' : 'Немає в наявності'}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
