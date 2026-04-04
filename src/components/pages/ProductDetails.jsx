import React, { useEffect, useState } from 'react'




import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import'swiper/css';
import'swiper/css/effect-fade';
import'swiper/css/navigation'; 
import { Link, useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/shop/product/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(err => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images ? product.images[0] : product.image);
      setImages(product.images ? product.images : [product.image, product.secondImage].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

  if (loading) return <div className="container py-5 text-center">Завантаження...</div>;
  if (!product) return <div className="container py-5 text-center text-danger">Товар не знайдено!</div>;

  return (
    
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to='/'>Головна</Link></li>
        <li className="position-relative active"><Link to="/categories" className='ps-5'>Каталог</Link></li>
        <li className="position-relative active"><a href="#" className='ps-5'>{product?.name || product?.Productname}</a></li>
      </ol>

      <div className="container py-5">
        <div className="row">
          <div className="col-xl-6">
            <div className="d-flex flex-column-reverse flex-md-row mb-4">
              <div className="d-flex flex-column me-3 thumbnail-images gap-2 flex-shrink-0" style={{ maxHeight: '550px', overflowY: 'auto', overflowX: 'hidden' }}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=''
                    onClick={() => setMainImage(img)}
                    className={`img-thumbnail ${mainImage === img ? 'border-dark' : ''}`}
                    style={{width:'100%', height:'80px', objectFit:'cover', cursor:'pointer'}}
                  />
                ))}
              </div>
              <div 
                className="main-image-container bg-light rounded-4 d-flex align-items-center justify-content-center p-3" 
                style={{ flex: '1 1 auto', maxHeight: '550px', minHeight: '300px', minWidth: 0, overflow: 'hidden' }}
              >
                <img 
                  src={mainImage} 
                  className='img-fluid' 
                  alt="Main" 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <h5 className="fw-bold">
              {product.price}
            </h5>
            <h2 className="mb-5 fw-semibold">
              {product?.name || product?.Productname}
            </h2>

            <p className="fw-semibold mb-1">
              Кількість
            </p>
            <div className="d-flex align-items-center gap-3 mb-3 quantity">
              <div className="d-flex align-items-center Quantity-box" style={{maxWidth:'200px'}}>
                <button className='btn-count border-0' 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  - 
                </button>
                <input
                  type="text"
                  className='form-control text-center mx-2'
                  value={quantity}
                  readOnly
                />
                <button className='btn-count border-0' 
                onClick={() => setQuantity((q) => Math.max(1, q + 1))}
                >
                  + 
                </button>  
              </div>
              <button className="btn-custome w-100" onClick={() => {
                const existing = JSON.parse(localStorage.getItem('cart')) || [];
                const alreadyInCart = existing.find(p => p.id === product.id);
                if (!alreadyInCart) {
                  const updatedCart = [...existing, {...product, quantity}];
                  localStorage.setItem('cart', JSON.stringify(updatedCart));
                  window.dispatchEvent(new Event('cartUpdated'));
                  window.dispatchEvent(new CustomEvent('showCartModal', { detail: { product, message: 'Товар додано до кошика!' } }));
                } else {
                  window.dispatchEvent(new CustomEvent('showCartModal', { detail: { product, message: 'Товар вже у кошику!' } }));
                }
              }}>
                Додати в кошик
              </button>
            </div>  
            <Link to="/checkout" className="btn btn-custome2 w-100 border-0 d-flex align-items-center justify-content-center">
              Купити зараз
            </Link>
            <hr />
            <p><strong>Виробник:</strong> Все для дому</p>  
            <p><strong>Категорії:</strong> Меблі, Популярне, Новинки, Для дому</p>
            <p><strong>Артикул:</strong> {product?.id}</p>
          </div>      
        </div>
      </div>

      <div className="container my-5">
        <ul className="nav nav-tabs border-0 justify-content-center mb-4" id="productTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link tab active border-0 fw-bold fs-4 text-capitalize"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
            >
              Опис
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link tab border-0 fw-bold fs-4 text-capitalize"
              id="shipping-tab"
              data-bs-toggle="tab"
              data-bs-target="#shipping"
              type="button"
            >
              Доставка і Повернення
            </button>
          </li>
        </ul>

        <div className="tab-content" id="productTabContent">
          <div className="tab-panel fade show active" id="description" role="tabpanel">
            <p><strong>Ідеально підходить для будь-якого інтер'єру</strong></p>
            <p>Сучасні меблі, виготовлені з якісних та екологічних матеріалів, що гарантують максимальний комфорт і довговічність. Деталі продумані до дрібниць, щоб забезпечити вам найкращий досвід використання щодня.</p>
            <h5 className="mt-4">Переваги</h5>
            <ul className="Benefits-list p-0">
              <li className="position-relative">Високоякісні зносостійкі матеріали</li>
              <li className="position-relative">Ергономічний дизайн та зручність</li>
              <li className="position-relative">Довговічність та надійність у використанні</li>
              <li className="position-relative">Стильний зовнішній вигляд</li>
              <li className="position-relative">Просте та швидке збирання</li>
            </ul>
          </div>

          <div className="tab-panel fade" id="shipping" role="tabpanel">
            <p>Ми пропонуємо кілька способів доставки, зокрема самовивіз, адресну доставку по місту та відправку поштовими службами по всій Україні. Обробляємо замовлення протягом 1-2 днів. Для більш детальної інформації ознайомтесь зі сторінками <Link to="/shipping" className="text-dark fw-bold">Доставка і оплата</Link> та <Link to="/returns" className="text-dark fw-bold">Повернення</Link>.</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductDetails