import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import'swiper/css'
import'swiper/css/effect-fade' 

// Data

import MainProducts from '../../main_products.json'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Index() {

  const[filterSortOption, setFilterSortOption] = useState('all');

  const navigate = useNavigate();

  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
      toast.success(`${product.name} Товар додано до списку бажань!`);
    } else {
      toast.info(`${product.name} вже в списку бажань!`);
    }   
  }

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    const alreadyInCart = existing.find(p => p.id === product.id);
    if (!alreadyInCart) {
      const updatedProduct = {...product, quantity: 1};
      const updatedCart = [...existing, updatedProduct];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new CustomEvent('showCartModal', { detail: { product, message: 'Товар додано до кошика!' } }));
    } else {
      window.dispatchEvent(new CustomEvent('showCartModal', { detail: { product, message: 'Товар вже в кошику!' } }));
    }   
  }

  return (
    <>
        {/*  Hero  */}
        <div className="hero">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 6000,
            }}
          >
            <SwiperSlide>
              <div className="hero-wrap hero-wrap1">
                <div className="hero-content">
                  <h5>- МАКСИМАЛЬНИЙ КОМФОРТ -</h5>
                  <h1>Відчуйте себе <br /> як вдома</h1>
                  <p className="my-3">Ідеальне поєднання стилю та домашнього затишку в нашій новій колекції м'яких меблів.</p>
                  <a href="#" className='btn hero-btn mt-3'>До каталогу</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-wrap hero-wrap2">
                <div className="hero-content">
                  <h5>- СУЧАСНЕ ЖИТТЯ -</h5>
                  <h1>Мінімалізм та <br /> Функціональність</h1>
                  <p className="my-3">Чіткі лінії та розумний дизайн, що перетворюють звичайний простір на сучасний інтер'єр.</p>
                  <a href="#" className='btn hero-btn mt-3'>До каталогу</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-wrap hero-wrap3">
                <div className="hero-content">
                  <h5>- ЧАС ДЛЯ СНІВ -</h5>
                  <h1>Спіть краще, <br /> живіть яскравіше</h1>
                  <p className="my-3">Відкрийте для себе ергономічні ліжка та матраци для відпочинку, на який ви заслуговуєте.</p>
                  <a href="#" className='btn hero-btn mt-3'>До каталогу</a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>  
        </div>
        {/* Products */}
        <div className="product-container py-5 my-5">
          <div className="container position-relative">
            <div className="row">
              <div className="section-title mb-5 product-title text-center ">
                <h2 className="fw-semibold fs-1">Популярні товари</h2>
                <p className="text-muted">Отримайте комфорт, про який мрієте</p>
              </div>
            </div>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              modules={Navigation}
              navigation={{ nextEl: ".product-swiper-next", prevEl: ".product-swiper-prev" }}
              breakpoints={{
                1367: {slidesPerView:4},
                1070: {slidesPerView:3},
                769: {slidesPerView:2},
                379: {slidesPerView:1.5},
                0: {slidesPerView:1},
              }}   
              className='mt-4 swiper position-relative' 
            >
              {MainProducts.map(product => (
                  <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                    <div className="product-item text-center position-relative">
                      <div className="product-image w-100 position-relative overflow-hidden">
                        <img src={product.images[0]} alt="" className='img-fluid' />
                        {product.images[1] && <img src={product.images[1]} alt="" className='img-fluid' />}
                        <div className="product-icons gap-3">
                          <div className="product-icon" title="Додати до списку бажань" onClick={(e) =>  {e.preventDefault(); e.stopPropagation(); addToWishlist(product);}}>
                            <i className="bi bi-heart fs-5"></i>
                          </div>
                          <div className="product-icon" title="Додати в кошик" onClick={(e) => {e.preventDefault(); e.stopPropagation(); addToCart(product);}}>
                            <i className="bi bi-cart3 fs-5"></i>
                          </div>
                          {product.tag && (
                            <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                              {product.tag}
                            </span>
                          )}
                        </div>
                          <div className="product-content pt-3">
                            <span className="price text-decoration-none">{product.price} ₴</span>
                            <h3 className='title pt-1'>{product.name}</h3>
                          </div>
                       </div> 
                    </div>
                    </Link>
                  </SwiperSlide>
              ))}    
            </Swiper>
          </div>
        </div>

        {/* Brands */}
        <section className="brands-section py-5">
          <div className="container">
            <div className="brands-header d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-semibold fs-2 mb-1">Бренди</h2>
                <p className="text-muted mb-0">Ми працюємо лише з перевіреними виробниками</p>
              </div>
              <Link to="/brands" className="btn btn-outline-dark px-4">
                Всі бренди <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="brands-grid">
              {[
                { name: 'GTV',      img: 'https://vdm-shop.com.ua/upload/filters/900/gtv.jpg' },
                { name: 'MAAG',     img: 'https://vdm-shop.com.ua/upload/filters/900/mag.jpg' },
                { name: 'Rejs',     img: 'https://vdm-shop.com.ua/upload/filters/900/reis.png' },
                { name: 'ZBYTEX',   img: 'https://vdm-shop.com.ua/upload/filters/900/zbytex.png' },
                { name: 'GAMET',    img: 'https://vdm-shop.com.ua/upload/filters/900/gamet.png' },
                { name: 'ATM',      img: 'https://vdm-shop.com.ua/upload/filters/900/atm.jpg' },
                { name: 'Sevroll',  img: 'https://vdm-shop.com.ua/upload/filters/900/sevroll.jpg' },
                { name: 'AMIG',     img: 'https://vdm-shop.com.ua/upload/filters/900/amig.jpg' },
                { name: 'MANTION',  img: 'https://vdm-shop.com.ua/upload/filters/900/mantion.png' },
                { name: 'Häfele',   img: 'https://vdm-shop.com.ua/upload/filters/900/hafele.jpg' },
                { name: 'FGV',      img: 'https://vdm-shop.com.ua/upload/filters/900/fgv.png' },
                { name: 'ALTORI',   img: 'https://vdm-shop.com.ua/upload/filters/900/altori.png' },
              ].map(brand => (
                <a
                  key={brand.name}
                  href="https://vdm-shop.com.ua/brendy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card"
                  title={brand.name}
                >
                  <img src={brand.img} alt={brand.name} />
                  <span className="brand-name">{brand.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

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
  )
}

export default Index