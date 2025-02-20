import axios from 'axios';
import React from 'react'
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

export default function Categories() {
    
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
    <Helmet>
        <title>categories</title>
    </Helmet>
    {data.data.data.map((category)=>{
        return <>
       <div className=' border-2 border-gray-400 shadow-sm grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  my-3'>
         <img src={category.image} alt="" className='w-full h-full border-2 border-gray-400 border-opacity-5' />
        <h3 className=' font-bold mt-20 ml-6'>{category.name}</h3>
        </div>
   </> }

    )}
    </>
  )
}
