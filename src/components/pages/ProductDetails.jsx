import React, { useEffect, useState } from 'react'


//Data
import Products from './../../Product.json';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import'swiper/css';
import'swiper/css/effect-fade';
import'swiper/css/navigation'; 
import { Link, useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const product = Products.find((p) => p.id == id);

  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setImages([product.image, product.secondImage].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

  const colors = ['#000000', '#7B3F00', '#9BBEC8'];



  return (
    
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to='/'>Home</Link></li>
        <li className="position-relative active"><a href="#" className='ps-5'>Beauty & Cosmetics </a></li>
        <li className="position-relative active"><a href="#" className='ps-5'>{product.Productname} </a></li>
      </ol>
    </>
  )
}

export default ProductDetails