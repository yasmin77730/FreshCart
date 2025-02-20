import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../../components/Loading/Loading'
import { Helmet } from 'react-helmet'

export default function Brands() {

    async function getBrands() {
        let options={
          url:"https://ecommerce.routemisr.com/api/v1/brands",
          method:'GET'
        }
         return axios.request(options)
        
      }
      let {data ,isLoading,isError}= useQuery({
        queryKey:["brands"],
        queryFn:getBrands,
        refetchOnMount:false

      });
      console.log(data);
      
   if(isLoading) return <Loading/>

  return (
    <>
    <Helmet>
        <title>brands</title>
    </Helmet>
   <div className='flex flex-wrap justify-center items-center'>
   {data.data.data.map((brands)=>{
        return(
        <>
     <div className='bg-gray-500'>
     <img src={brands.image} alt="" className='w-full' />
   
     </div>
        </>
    
        ) }   
        )}
   </div>
    </>
  )
}
