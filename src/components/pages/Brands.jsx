import React, { useState } from 'react'

const ALL_BRANDS = [
  { name: 'GTV',                img: 'https://vdm-shop.com.ua/upload/filters/900/gtv.jpg' },
  { name: 'MAAG',               img: 'https://vdm-shop.com.ua/upload/filters/900/mag.jpg' },
  { name: 'Rejs',               img: 'https://vdm-shop.com.ua/upload/filters/900/reis.png' },
  { name: 'ZBYTEX',             img: 'https://vdm-shop.com.ua/upload/filters/900/zbytex.png' },
  { name: 'GAMET',              img: 'https://vdm-shop.com.ua/upload/filters/900/gamet.png' },
  { name: 'ATM',                img: 'https://vdm-shop.com.ua/upload/filters/900/atm.jpg' },
  { name: 'Sevroll',            img: 'https://vdm-shop.com.ua/upload/filters/900/sevroll.jpg' },
  { name: 'AMIG',               img: 'https://vdm-shop.com.ua/upload/filters/900/amig.jpg' },
  { name: 'MANTION',            img: 'https://vdm-shop.com.ua/upload/filters/900/mantion.png' },
  { name: 'Häfele',             img: 'https://vdm-shop.com.ua/upload/filters/900/hafele.jpg' },
  { name: 'FGV',                img: 'https://vdm-shop.com.ua/upload/filters/900/fgv.png' },
  { name: 'ALTORI',             img: 'https://vdm-shop.com.ua/upload/filters/900/altori.png' },
  { name: 'Decoris',            img: null },
  { name: 'Starax',             img: null },
  { name: 'Linken System',      img: null },
  { name: 'DOMAX',              img: null },
  { name: 'BI-PLAST',          img: null },
  { name: 'MVM',                img: null },
  { name: 'FOLMAG',             img: null },
  { name: 'KREATOR Logic',      img: null },
  { name: 'HOGERT',             img: null },
  { name: 'Blum',               img: null },
  { name: 'GIFF',               img: null },
  { name: 'Scilm',              img: null },
  { name: 'LACRYSIL',           img: null },
  { name: 'UNIKA',              img: null },
  { name: 'Interbond',          img: null },
  { name: 'Hranipex',           img: null },
  { name: 'BOCHEM',             img: null },
  { name: 'BRW',                img: null },
  { name: 'KUCHINOX',           img: null },
  { name: 'Giusti',             img: null },
  { name: 'SIRO',               img: null },
  { name: 'Airtic',             img: null },
  { name: 'EL-MECH-PLAST',     img: null },
  { name: 'Shop-Line',          img: null },
  { name: 'MOHAWK',             img: null },
  { name: 'Zweihorn',           img: null },
  { name: 'Laguna',             img: null },
  { name: 'BIMAK',              img: null },
  { name: 'Lemax',              img: null },
  { name: 'MESAN',              img: null },
  { name: 'Korner',             img: null },
  { name: 'Rehau',              img: null },
  { name: 'Новий стиль',       img: null },
  { name: 'AMF',                img: null },
  { name: 'Gilardi',            img: null },
  { name: 'Matroluxe',          img: null },
  { name: 'TESA',               img: null },
  { name: 'VARTA',              img: null },
  { name: 'Faba',               img: null },
  { name: 'Rishang',            img: null },
  { name: 'HOROZ',              img: null },
  { name: 'Electrum',           img: null },
  { name: 'MAXUS',              img: null },
  { name: 'Lemanso',            img: null },
  { name: 'ElectroHouse',       img: null },
  { name: 'ItalianaFerramenta', img: null },
  { name: 'CAMAR',              img: null },
  { name: 'ZGODA',              img: null },
  { name: 'CLEAN2TECH',         img: null },
  { name: 'SISO',               img: null },
  { name: 'Україна',            img: null },
  { name: 'VOLPATO',            img: null },
  { name: 'UNIFIX',             img: null },
  { name: 'Rothley',            img: null },
  { name: 'Ceresit',            img: null },
  { name: 'TYTAN',              img: null },
  { name: 'Pattex',             img: null },
]

// Генеруємо placholder-колір з назви бренду
const getBrandColor = (name) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 20%, 92%)`
}

function Brands() {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? ALL_BRANDS.filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_BRANDS

  // Групуємо по першій літері
  const groups = {}
  filtered.forEach(brand => {
    const letter = brand.name[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(brand)
  })
  const sortedLetters = Object.keys(groups).sort()

  return (
    <main className="brands-page">
      {/* Hero хедер */}
      <section className="brands-page-hero">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/" className="text-muted text-decoration-none">Головна</a></li>
              <li className="breadcrumb-item active text-dark" aria-current="page">Бренди</li>
            </ol>
          </nav>
          <h1 className="brands-page-title">Наші бренди</h1>
          <p className="brands-page-subtitle">
            Ми співпрацюємо з {ALL_BRANDS.length} перевіреними виробниками меблевої фурнітури та аксесуарів
          </p>

          {/* Пошук по брендах */}
          <div className="brands-search-wrap">
            <i className="bi bi-search brands-search-icon"></i>
            <input
              type="text"
              className="brands-search-input"
              placeholder="Знайти бренд..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                className="brands-search-clear"
                onClick={() => setQuery('')}
                aria-label="Очистити"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Список брендів */}
      <section className="brands-page-list py-5">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search text-muted" style={{ fontSize: '2.5rem' }}></i>
              <p className="text-muted mt-3 fs-5">Бренд <strong>"{query}"</strong> не знайдено</p>
            </div>
          ) : query.trim() ? (
            /* Без групування якщо йде пошук */
            <>
              <p className="text-muted mb-4">Знайдено {filtered.length} брендів</p>
              <div className="brands-full-grid">
                {filtered.map(brand => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </>
          ) : (
            /* З групуванням по літері */
            sortedLetters.map(letter => (
              <div key={letter} className="brands-letter-group mb-5">
                <div className="brands-letter-divider">
                  <span className="brands-letter-badge">{letter}</span>
                </div>
                <div className="brands-full-grid mt-3">
                  {groups[letter].map(brand => (
                    <BrandCard key={brand.name} brand={brand} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

function BrandCard({ brand }) {
  const bg = getBrandColor(brand.name)
  return (
    <a
      href={`https://vdm-shop.com.ua/brd:${brand.name.toLowerCase().replace(/\s+/g, '-').replace(/[äöü]/g, c => ({ ä: 'a', ö: 'o', ü: 'u' })[c] || c)}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="brands-full-card"
      title={brand.name}
    >
      <div className="brands-full-img-wrap" style={{ background: brand.img ? '#fff' : bg }}>
        {brand.img ? (
          <img src={brand.img} alt={brand.name} />
        ) : (
          <span className="brands-full-initials">{brand.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <span className="brands-full-name">{brand.name}</span>
    </a>
  )
}

export default Brands
