import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import { Helmet } from 'react-helmet'

export default function Products() {
    async function getData() {
        let options={
          url:"https://ecommerce.routemisr.com/api/v1/products",
          method:'GET'
        }
         return axios.request(options)
        
        
      }
     let {data ,isLoading,isError}= useQuery({
        queryKey:["products"],
        queryFn:getData,
        refetchOnMount:false
     })
     if(isLoading) return <Loading/>
  return (
   <>
   <Helmet>
    <title>products</title>
   </Helmet>

   <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  my-3 ">
    {data.data.data.map((products)=>
    
     <Card productInfo={products} key={products.id} />
    )}
    </div>
   </>
  )
}
