import React from 'react'
import sliderimg1 from '../../assets/images/slider-image-1.jpeg'
import sliderimg2 from '../../assets/images/slider-image-2.jpeg'
import sliderimg3 from '../../assets/images/slider-image-3.jpeg'



// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
 

export default function HomeSlider() {
  return (
    <>
    <section className='grid grid-cols-12 my-4 bg-red-400'>
      <div className="col-span-8">
        <img className='w-full h-full object-cover'  src={sliderimg3} alt="" />

      </div>
      <div className="col-span-4">
        <img className='w-full ' src={sliderimg1} alt="" />
        <img className='w-full ' src={sliderimg2} alt="" />
      </div>

    </section>
    
    </>
  )
}
