import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import axios from 'axios'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import useOnline from '../../hooks/useOnline'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  let isOnline= useOnline()


async function getData() {
  let options={
    url:"https://ecommerce.routemisr.com/api/v1/products",
    method:'GET'
  }
   return axios.request(options)
  
  
}
let {data ,isLoading,isError}=useQuery({
  queryKey:["products"],
  queryFn:getData,
  refetchOnMount:false
})
if(isLoading) return <Loading/>



  return (
<>

<Helmet>
  <title>Home Page</title>
  <meta name='description' content='FreshCart || Home Page,............. '/>
  <meta name='Keywords' content='E-commerce ,FreshCart' />
</Helmet>

<h2 className='text-center text-lg mt-2'>{isOnline ? (<> <span>online </span> <i class="fa-solid fa-check text-primary-900"></i>  </>)
: (<> <span>offline </span><i class="fa-solid fa-xmark text-red-600"></i>  </>)}</h2>

<HomeSlider/>
<CategorySlider/>

<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  my-3 ">
 {data.data.data.map((products)=>
 
  <Card productInfo={products} key={products.id} />
 )}
 </div>

</>
  )
}
