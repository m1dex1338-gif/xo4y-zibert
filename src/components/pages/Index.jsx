import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import'swiper/css'
import'swiper/css/effect-fade'

function Index() {
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
                  <h5>- ESSENSTIAL ITEMS</h5>
                  <h1>Beauty Inspired <br /> by Real Life</h1>
                  
                </div>
              </div>
            </SwiperSlide>
          </Swiper>  
        </div>
    </>
  )
}

export default Index