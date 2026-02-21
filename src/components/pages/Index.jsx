import React, { use } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import'swiper/css'
import'swiper/css/effect-fade' 

// Data

import Products from './../../Product.json'
import { Link } from 'react-router-dom'
import ChairAnimation from '../ChairAnimation'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Index() {

  const[filterSortOption, setFilterSortOption] = useState('all');

  const navigate = useNavigate();

  const addTowishlist = (product) => {
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
      toast.success(`${product.name} Товар додано до кошика!`);
    } else {
      toast.info(`${product.name} вже в кошику!`);
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
              delay: 3000,
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
        {/* Chair Animation */}
        <ChairAnimation />
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
                1399: {slidesPerView:4},
                1199: {slidesPerView:3},
                991: {slidesPerView:2},
                767: {slidesPerView:1.5},
                0: {slidesPerView:1},
              }}   
              className='mt-4 swiper position-relative' 
            >
              {Products.filter(product => product.id >= 0 && product.id <= 10).map(product => (
                  <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                    <div className="product-item text-center position-relative">
                      <div className="product-image w-100 position-relative overflow-hidden">
                        <img src={product.image} alt="" className='img-fluid' />
                        <img src={product.secondImage} alt="" className='img-fluid' />
                        <div className="product-icons gap-3">
                          <div className="product-icon" title="Додати до списку бажань" onclick={() => addToWishlist(product)}>
                            <i className="bi bi-heart fs-5"></i>
                          </div>
                          <div className="product-icon" title="Додати в кошик" onclick={() => addToCart(product)}>
                            <i className="bi bi-cart3 fs-5"></i>
                          </div>
                          <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                            {product.tag}
                          </span>
                        </div>
                          <div className="product-content pt-3">
                            <span className="price text-decoration-none">{product.price}</span>
                            <h3 className='title pt-1'>{product.Productname}</h3>
                          </div>
                       </div> 
                    </div>
                    </Link>
                  </SwiperSlide>
              ))}    
            </Swiper>
          </div>
        </div>
    </>
  )
}

export default Index