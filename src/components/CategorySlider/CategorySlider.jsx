import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';


export default function CategorySlider() {

    async function getCategories() {
       const options={
            url:'https://ecommerce.routemisr.com/api/v1/categories',
            method:'GET',
        }
       return axios.request(options);
      
        
    }
  let{data,isError,isLoading}=useQuery({
   queryKey:["categories"],
   queryFn:getCategories,
   refetchOnMount:false,
   staleTime:60*60*1000,
  })
  if(isLoading)return <Loading/>
    
  return (
 <>
 <section className='my-9'>
    <h2 className='mb-5 font-semibold text-xl'>Shop Popular Categories</h2>
  <Swiper slidesPerView={6} loop={true}>
    {data.data.data.map((category)=><SwiperSlide key={category.id} >
       <div className='h-64'>
         <img className='h-full w-full ' src={category.image} alt="" /></div>
        <h3 className='mt-3'>{category.name}</h3>

    </SwiperSlide>)}
    </Swiper>
 
 </section>
 </>
  )
}
